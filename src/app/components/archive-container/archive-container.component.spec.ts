import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SearchPipe} from 'src/app/pipe/search.pipe';

import { ArchiveContainerComponent } from './archive-container.component';

describe('ArchiveContainerComponent', () => {
  let component: ArchiveContainerComponent;
  let fixture: ComponentFixture<ArchiveContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveContainerComponent,SearchPipe],
      imports:[HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ArchiveContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
