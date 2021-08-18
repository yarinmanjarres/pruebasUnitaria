import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of} from "rxjs";
import { Book } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";
import { HomeComponent } from "./home.component"


const listbook: Book[] =[
  {
  name : '',
  author: '',
  isbn: '',
  price: 15,
  amount: 2
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 1
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7
  }
]

@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
  transform(): string{
    return '';
  }
}

describe('Home component', ()=>{
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations:[
        HomeComponent,
        ReduceTextPipeMock
      ],
      providers:[
        BookService
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  });

  beforeEach(()=>{
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });


  it("si se creo el de home", ()=>{
    expect(component).toBeTruthy();
  });


  // public getBooks(): void {
  //   this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
  //     this.listBook = resp;
  //   });
  // }

  it('probar metodo con un servicio que retorna una data en observable', ()=>{
    const bookService = fixture.debugElement.injector.get(BookService);
    const spy1 = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce(of(listbook));
    component.getBooks();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(component.listBook.length).toBe(3);
    expect(component.listBook).toEqual(listbook);
  })

})
