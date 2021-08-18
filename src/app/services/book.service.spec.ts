import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";
import { Book } from "../models/book.model";
import { BookService } from "./book.service";



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
    price: 30,
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

describe('prueba de servicios bookservice', ()=>{
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[BookService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(()=>{
    service = TestBed.inject(BookService);
    // service = TestBed.get(BookService); forma vieja antes de la 9
    httpMock= TestBed.inject(HttpTestingController)
  });

  afterEach(()=>{
    localStorage.clear();
    jest.resetAllMocks();
  });

  afterAll(()=>{

    httpMock.verify();
  });

  it('verificar que el servicio se creo', ()=>{
    expect(service).toBeTruthy();
  });

  // public getBooks(): Observable<Book[]> {
  //   const url: string = environment.API_REST_URL + `/book`;
  //   return this._httpClient.get<Book[]>(url);
  // }

  it('prueba de llamado de servicio', ()=>{
    service.getBooks().subscribe((resp: Book[])=>{
      expect(resp).toEqual(listbook);
    });
    const req = httpMock.expectOne(environment.API_REST_URL + "/book");
    expect(req.request.method).toBe('GET');
    req.flush(listbook);
  })

  it('prueba de un servicio que se alimenta por un localstorage vacio', ()=>{
    const listadolibros = service.getBooksFromCart();
    expect(listadolibros.length).toBe(0);

  })

  it('prueba de un servicio que se alimenta por un localstorage lleno', ()=>{
    localStorage.setItem('listCartBook', JSON.stringify(listbook));
    const newlistBook = service.getBooksFromCart();
    expect(newlistBook.length).toBe(3);
  })


  // public addBookToCart(book: Book) {
  //   let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
  //   if (listBook === null) { // Create a list with the book
  //     book.amount = 1;
  //     listBook = [ book ];
  //   } else {
  //     const index = listBook.findIndex((item: Book) => {
  //       return book.id === item.id;
  //     });
  //     if (index !== -1) { // Update the quantity in the existing book
  //       listBook[index].amount++;
  //     } else {
  //       book.amount = 1;
  //       listBook.push(book);
  //     }
  //   }
  //   localStorage.setItem('listCartBook', JSON.stringify(listBook));
  //   this._toastSuccess(book);
  // }

  // it('prueba de metodo en no existe contenido en el localstorage en el metodo anterior comentado',()=>{
  //     const book: Book = {
  //       name:"",
  //       author: "",
  //       isbn: "",
  //       price: 15
  //     }
  //     const spy1 = jest.spyOn(Swal, 'mixin').mockImplementation(()=>{
  //       return
  //     })

  //     service.addBookToCart(book);

  // })

})
