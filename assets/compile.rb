Dir.entries(ARGV[0]).each do |lib|
    $LOAD_PATH.unshift "#{ARGV[0]}/#{lib}/lib"
end

gem 'sass', '=3.4.5'

require 'rubygems'
require 'sass'
require 'compass'
require 'compass/exec'

command_line_class = Compass::Exec::SubCommandUI.new([ARGV[1], ARGV[2], "-q"]).run!
