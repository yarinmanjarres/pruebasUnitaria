import { CartComponent } from "./cart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { By } from "@angular/platform-browser";


// id?: string;
// name: string;
// author: string;
// isbn: string;
// description?: string;
// photoUrl?: string;
// price?: number;
// amount?: number;

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






describe('Cart component', ()=>{
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [
        CartComponent
      ],
      providers:[
        BookService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  // ngOnInit(): void {
  //   this.listCartBook = this._bookService.getBooksFromCart();
  //   this.totalPrice = this.getTotalPrice(this.listCartBook);
  // }



  beforeEach(()=>{
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);
    jest.spyOn(service, "getBooksFromCart").mockImplementation(()=> listbook);
  });

  it('a ver si se creo', ()=>{
    expect(component).toBeTruthy();
  })


  afterEach(()=>{
    fixture.destroy();
    jest.resetAllMocks();
  })


  // public getTotalPrice(listCartBook: Book[]): number {
  //   let totalPrice = 0;
  //   listCartBook.forEach((book: Book) => {
  //     totalPrice += book.amount * book.price;
  //   });
  //   return totalPrice;
  // }


  it('prueba de funcion con return', ()=>{
    const totalPrice = component.getTotalPrice(listbook);
    expect(totalPrice).toBeGreaterThan(0);
    // expect(totalPrice).not.toBe(0);
    // expect(totalPrice).not.toBeNull();
  })

  // public onInputNumberChange(action: string, book: Book): void {
  //   const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
  //   book.amount = Number(amount);
  //   this.listCartBook = this._bookService.updateAmountBook(book);
  //   this.totalPrice = this.getTotalPrice(this.listCartBook);
  // }


  it("prueba a funcion void", ()=>{

    const action = 'plus';
    const book: Book = {
      name: "",
      author: "",
      isbn: "",
      price: 15,
      amount: 2
    }

    const spy1 = jest.spyOn(service, "updateAmountBook").mockImplementation(()=> null);
    const spy2 = jest.spyOn(component, "getTotalPrice").mockImplementation(()=> null);
    expect(book.amount).toBe(2);
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(3);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);


  })



  // public onClearBooks(): void {
  //   if (this.listCartBook && this.listCartBook.length > 0) {
  //     this._clearListCartBook();
  //   } else {
  //      console.log("No books available");
  //   }
  // }

  // private _clearListCartBook() {
  //   this.listCartBook = [];
  //   this._bookService.removeBooksFromCart();
  // }

  it("prueba a con un metodo privado", ()=>{
    const spy1 = jest.spyOn(service, "removeBooksFromCart").mockImplementation(()=> null);
    const spy2 = jest.spyOn(component as any, "_clearListCartBook");
    component.listCartBook = listbook;
    component.onClearBooks();
    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  })

  it("prueba al metodo privado directamente que no es recomendable ", ()=>{
    const spy1 = jest.spyOn(service, "removeBooksFromCart").mockImplementation(()=> null);
    component.listCartBook = listbook;
    component["_clearListCartBook"]();

    expect(spy1).toHaveBeenCalledTimes(1);


  })

  it('titulo carro vacio uso de prueba de integracion lleno', ()=>{
    component.listCartBook = listbook;
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
    expect(debugElement).toBeFalsy();
  })

  it('titulo carro vacio uso de prueba de integracion vacio carro y uso de texto en html  ', ()=>{
    component.listCartBook = [];
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
    expect(debugElement).toBeTruthy();
    if(debugElement){
      const element: HTMLElement = debugElement.nativeElement;
      expect(element.innerHTML).toContain('The cart is empty');
    }
  })





})
