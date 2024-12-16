import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SearchPipe} from 'src/app/pipe/search.pipe';
import { TrashContainerComponent } from './trash-container.component';
import { HttpClientModule } from '@angular/common/http';

describe('TrashContainerComponent', () => {
  let component: TrashContainerComponent;
  let fixture: ComponentFixture<TrashContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrashContainerComponent,SearchPipe],
      imports:[HttpClientModule]
    });
    fixture = TestBed.createComponent(TrashContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
