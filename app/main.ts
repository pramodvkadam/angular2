import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { Config } from './config/app.config'
import { appRouterProviders } from './routes/app.routes';

bootstrap(AppComponent, [
    appRouterProviders, Config, HTTP_PROVIDERS
]).catch(err => console.error(err));
