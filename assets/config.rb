# Compass is a great cross-platform tool for compiling SASS.
# This compass config file will allow you to
# quickly dive right in.
# For more info about compass + SASS: http://net.tutsplus.com/tutorials/html-css-techniques/using-compass-and-sass-for-css-in-your-next-project/

require 'compass'

begin
  gem 'compass-growl'
  require 'compass-growl'
rescue Gem::LoadError
end


# We all know that IE, as usual, is a pain in the ass. It even has a selector limit of 4096 per file.
# This means that the 4097th selector and all after that wont be processed.
# The code below tries to fix that issue by splitting the css up into multiple files.
# The first file contains all selectors. The nth files contain up to 4096 selectors.
# This way, non-IE browsers can use the 1st file generated, while lte IE 9 browsers can load the extra files with conditional comments
#
# See: http://stackoverflow.com/questions/12204900/how-to-install-compass-code-to-split-style-sheets-for-ie-selector-limit

class CssSplitter

  def self.split(infile, outdir = File.dirname(infile), max_selectors = 3800)

    raise "infile could not be found" unless File.exists? infile

    rules = IO.readlines(infile, "}")
    return if rules.first.nil?

    charset_statement, rules[0] = rules.first.partition(/^\@charset[^;]+;/)[1,2]
    return if rules.nil?

    # The infile remains the first file
    file_id = 1
    selectors_count = 0
    output = nil

    rules.each do |rule|
      rule_selectors_count = count_selectors_of_rule rule
      selectors_count += rule_selectors_count

      # Nothing happens until the selectors limit is reached for the first time
      if selectors_count > max_selectors
        # Close current file if there is already one
        output.close if output

        # Prepare next file
        file_id += 1
        filename = File.join(outdir, File.basename(infile, File.extname(infile)) + "_#{file_id.to_s}" + File.extname(infile))
        output = File.new(filename, "w")
        output.write charset_statement

        # Reset count with current rule count
        selectors_count = rule_selectors_count
      end

      output.write rule if output
    end
  end

  def self.count_selectors(css_file)
    raise "file could not be found" unless File.exists? css_file

    rules = IO.readlines(css_file, '}')
    return if rules.first.nil?

    charset_statement, rules[0] = rules.first.partition(/^\@charset[^;]+;/)[1,2]
    return if rules.first.nil?

    rules.inject(0) {|count, rule| count + count_selectors_of_rule(rule)}.tap do |result|
      puts File.basename(css_file) + " contains #{result} selectors."
    end
  end

  def self.count_selectors_of_rule(rule)
    rule.partition(/\{/).first.scan(/,/).count.to_i + 1
  end

end



#########
# 1. Set this to the root of your project when deployed:
http_path = "/"

# 2. probably don't need to touch these
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
javascripts_dir = "js"
environment = :development

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# You can select your preferred output style here (can be overridden via the command line):
output_style = (environment == :production) ? :compressed : :nested

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# don't touch this
preferred_syntax = :scss





on_stylesheet_saved do |path|
  CssSplitter.split(path) unless path[/\d+$/]
end