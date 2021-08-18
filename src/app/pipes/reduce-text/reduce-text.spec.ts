import { ReduceTextPipe } from "./reduce-text.pipe"

describe('prueba de prueba unitaria de una pipe', ()=>{
  let pipe: ReduceTextPipe;

  beforeEach(()=>{
    pipe = new ReduceTextPipe();
  });

  it('A  ver si se creo la pipe', ()=>{
    expect(pipe).toBeTruthy();
  });


  // transform(value: string, ...args: number[]): string { esta pipe lo que hace corta es un texto a n caracteres dependiendo que le pase por parametros
  //   return value.substring(0, args[0]);
  //}

  it('prueba de funcionamiento de pipe que corta caracteres', ()=>{
    const text = 'hola esto es un text descripcion';
    const newText = pipe.transform(text, 5);
    expect(newText.length).toBe(5);
  })


})
