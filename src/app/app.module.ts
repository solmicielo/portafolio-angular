import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Modulos
import { MenuComponent } from './componentes/menu/menu.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { FormacionComponent } from './componentes/formacion/formacion.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { PortafolioService } from './servicios/portafolio.service';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditFormacionComponent } from './add-edit-componentes/add-edit-formacion/add-edit-formacion.component';
import { AddEditPersonaComponent } from './add-edit-componentes/add-edit-persona/add-edit-persona.component';
import { AddEditExperienciaComponent } from './add-edit-componentes/add-edit-experiencia/add-edit-experiencia.component';
import { AddEditSkillsComponent } from './add-edit-componentes/add-edit-skills/add-edit-skills.component';
import { AddEditProyectosComponent } from './add-edit-componentes/add-edit-proyectos/add-edit-proyectos.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CabeceraComponent,
    ExperienciaComponent,
    FormacionComponent,
    SkillsComponent,
    ProyectosComponent,
    FooterComponent,
    LoginComponent,
    PortfolioComponent,
    AddEditFormacionComponent,
    AddEditPersonaComponent,
    AddEditExperienciaComponent,
    AddEditSkillsComponent,
    AddEditProyectosComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule
    
  ],
  providers: [PortafolioService, ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
