import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoteCardComponent } from './note-card.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteCardComponent],
      imports:[HttpClientTestingModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule
      ]
    });
    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
