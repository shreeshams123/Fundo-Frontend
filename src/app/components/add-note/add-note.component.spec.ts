import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddNoteComponent } from './add-note.component';
import { NotesService } from 'src/app/services/notes-service/notes.service';
import { of } from 'rxjs';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let notesService:jasmine.SpyObj<NotesService>;
  beforeEach(() => {
    const notesServiceSpy=jasmine.createSpyObj('NotesService',['postNotesApiCall']);
    TestBed.configureTestingModule({
      declarations: [AddNoteComponent],
      imports:[HttpClientTestingModule,
        
      ],
      providers:[
        {provide:NotesService,useValue:notesServiceSpy}
      ]
    });

    notesService = TestBed.inject(NotesService) as jasmine.SpyObj<NotesService>;
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
