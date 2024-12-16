import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotesContainerComponent } from './notes-container.component';
import { AddNoteComponent } from './../add-note/add-note.component';
import { SearchPipe } from 'src/app/pipe/search.pipe';
import { NotesService } from 'src/app/services/notes-service/notes.service';

describe('NotesContainerComponent', () => {
  let component: NotesContainerComponent;
  let fixture: ComponentFixture<NotesContainerComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesContainerComponent,
        AddNoteComponent,
        SearchPipe
      ],
      imports:[HttpClientTestingModule,
      ]
    });
    fixture = TestBed.createComponent(NotesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
