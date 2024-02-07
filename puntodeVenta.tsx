import 'bootstrap/dist/css/bootstrap.min.css'; 
import React from 'react'
import './pagos.css'
import { BorraImagg } from './interfaces/interfaces';
import { useState } from "react";
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import CustomButton from '../componentesjesus/boton';
import CustomInputs from '../componentesjesus/input';
const puntodeVenta = () => {
const [total, setTotal] = useState<number>(
        Number(localStorage.getItem('total') ?? 0)
      );
const [formDatas, setFormDatas] = useState<BorraImagg>({cliente:'',puntos: '', producto:'', puntosG:'', efectivo:'', transferencia:'', vdRegalo:'', cheque:'', tdDebito:'', tdCredito:'', monto:'', money:'', moneyG:''});
const [, setPorcentaje] = useState<number>(0);
const [mostrarss, setMostrarss] = useState(false);
const [mostrarsss, setMostrarsss] = useState(false);
const handleInputChang = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDatas({
      ...formDatas,
      [name]: value,
    });
        // Actualizar dinámicamente el porcentaje cuando cambia el input
        calcularPorcentaje();
        calcularTotal();
  };
  const handleChangeWrapper: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleInputChang(e);
  };
  const handleChangeWrapperr: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleInputChang(e);
  };
  const calcularPorcentaje = () => {
    const precioProducto = parseFloat(formDatas.producto);
    const puntosAcumulados = parseFloat(formDatas.puntosG);
    if (!isNaN(precioProducto) && !isNaN(puntosAcumulados) && precioProducto !== 0) {
      const nuevoPorcentaje = (puntosAcumulados / precioProducto) * 100;
      setPorcentaje(isNaN(nuevoPorcentaje) ? 0 : parseFloat(nuevoPorcentaje.toFixed(2)));
    } else {
      setPorcentaje(0);
    }
  };
  const calcularTotal = () => {
    const efectivo = parseFloat(formDatas.efectivo) || 0;
    const transferencia = parseFloat(formDatas.transferencia) || 0;
    const vdRegalo = parseFloat(formDatas.moneyG) || 0;
    const cheque = parseFloat(formDatas.cheque) || 0;
    const tdDebito = parseFloat(formDatas.tdDebito) || 0;
    const tdCredito = parseFloat(formDatas.tdCredito) || 0;
    const puntos = parseFloat(formDatas.puntosG) || 0;
    const totalCalculado = efectivo + transferencia + vdRegalo + cheque + tdDebito + tdCredito + puntos;
    setTotal(totalCalculado);
  };
  useEffect(() => {
    calcularTotal();
  }, [
    formDatas.efectivo,
    formDatas.transferencia,
    formDatas.moneyG,
    formDatas.cheque,
    formDatas.tdDebito,
    formDatas.tdCredito,
    formDatas.puntosG,
  ]);
  const mostrarFormularioss = () => {
    setMostrarss(true);
  };
  const mostrarFormulariosss = () => {
    setMostrarsss(true);
  };
  const [text, setText] = useState(() => {
    const storedText = window.localStorage.getItem('text');
    return storedText || ''; // Usa el valor almacenado o una cadena vacía por defecto
  });
  useEffect(() => {
    const storedText = window.localStorage.getItem('text');
    if (storedText !== text) {
      setText(storedText || '');
    }
  }, [text]);
  useEffect(() => {
  localStorage.setItem('total', String(total ?? 0))
  }, [total])
  const handleTotal = (e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    const isAnyValueGreaterThanZero =
    parseFloat(formDatas.efectivo) > 0 ||
    parseFloat(formDatas.transferencia) > 0 ||
    parseFloat(formDatas.moneyG) > 0 ||
    parseFloat(formDatas.cheque) > 0 ||
    parseFloat(formDatas.tdDebito) > 0 ||
    parseFloat(formDatas.tdCredito) > 0 ||
    parseFloat(formDatas.puntosG) > 0;
    if (isAnyValueGreaterThanZero) {
    const resultadoOriginal = (parseFloat(calcularMontoIVA()) + Number(totalSubtotal)).toFixed(2);
    if(!Number(total) || Number(total) < 0){
      console.log('No recibiste dinero')
    } else {
      console.log('Si recibiste dinero')
      setTotalEfectivo((prevTotal) => prevTotal + Number(formDatas.efectivo));
      setTotalTransferencia((prevTotal) => prevTotal + Number(formDatas.transferencia));
      setTotalMoneyG((prevTotal) => prevTotal + Number(formDatas.moneyG));
      setTotalCheque((prevTotal) => prevTotal + Number(formDatas.cheque));
      setTotalTdDebito((prevTotal) => prevTotal + Number(formDatas.tdDebito));
      setTotalTdCredito((prevTotal) => prevTotal + Number(formDatas.tdCredito));
      setTotalPuntosG((prevTotal) => prevTotal + Number(formDatas.puntosG));
      setTotalAcumulado((prevTotal) => prevTotal + Number(resultadoOriginal));
    }
    setImageData([]);
    setOriginalData([]);
    setFormData({
        name: '',
        precio: '',
        id: '',
        porcentaje: '',
    });
    setTotalAhorro(0);
    setDescuentoPorcentaje(0);
    setSelectedProducts(new Set());
    setTotal(0);
    setFormDatas({
      cliente: '',
      puntos: '',
      producto: '',
      puntosG: '',
      efectivo: '',
      transferencia: '',
      vdRegalo: '',
      cheque: '',
      tdDebito: '',
      tdCredito: '',
      monto: '',
      money:'',
      moneyG:'',
    });  
    setMostrarTotales(false);
  } else {
    console.log('Ningún valor es mayor a cero, no se realiza handleTotal');
  }
  }
  const [, setMostrarTotales] = useState(false);
  const [totalAcumulado, setTotalAcumulado] = useState(0);
  const [, setTotalEfectivo] = useState(0);
  const [totalTransferencia, setTotalTransferencia] = useState(0);
  const [totalMoneyG, setTotalMoneyG] = useState(0);
  const [totalCheque, setTotalCheque] = useState(0);
  const [totalTdDebito, setTotalTdDebito] = useState(0);
  const [totalTdCredito, setTotalTdCredito] = useState(0);
  const [totalPuntosG, setTotalPuntosG] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmations, setShowConfirmations] = useState(false);
  const [password, setPassword] = useState('');
  const handleCerrarClick = () => {
    setShowConfirmation(true);
  };
  const handleCancelarClick = () => {
    setShowConfirmation(false);
    setPassword('');
  };
  const handleVenta = () => {
    setShowConfirmations(true);
  }
  const handleCerrar = () =>{
    setShowConfirmations(false);
  }
  const handleAceptarClick = () => {
    if (password === 'tu_contraseña') {
      alert('La aplicación se cerrará. ¡Hasta luego!');
      // Aquí podrías agregar código adicional para cerrar la aplicación
    } else {
      alert('Contraseña incorrecta. No se cerrará la aplicación.');
    }
    setShowConfirmation(false);
    setPassword('');
  };
  // const handleCerrarClicks = () => {
  //   setMostrarBox2(false);
  // };
  const [aperturaCaja, setAperturaCaja] = useState('');
  const [totalDineroEfectivo, setTotalDineroEfectivo] = useState('');
  const [totalSalidasEfectivo, setTotalSalidasEfectivo] = useState('');
  const handleInputtChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    // Actualizar el estado según el nombre del campo
    switch (name) {
      case 'aperturaCaja':
        setAperturaCaja(value);
        break;
      case 'totalDineroEfectivo':
        setTotalDineroEfectivo(value);
        break;
      case 'totalSalidasEfectivo':
        setTotalSalidasEfectivo(value);
        break;
      default:
        break;
    }
  };
  const handleGuardarClick = () => {
    // Aquí puedes guardar los datos según tus requisitos
    console.log('Guardando datos:', {
      aperturaCaja,
      totalDineroEfectivo,
      totalSalidasEfectivo,
    });
    // Puedes realizar alguna lógica adicional de guardado aquí
  };
   //ESTAS SON LAS FUNCIONES PARA AMBAS PAGINAS
   const [mostrarBox1, setMostrarBox1] = useState(true);
   const cambiarBox = () => {
     const diferencia = total - (parseFloat(calcularMontoIVA()) + Number(totalSubtotal));
     if (diferencia >= 0) {
     // const [mostrarBox2, setMostrarBox2] = useState(false);
       setMostrarBox1(!mostrarBox1);
       // Limpiar los datos capturados
   setImageData([]);
   setOriginalData([]);
   setFormData({
       name: '',
       precio: '',
       id: '',
       porcentaje: '',
   });
   setTotalAhorro(0);
   setDescuentoPorcentaje(0);
   setSelectedProducts(new Set());
 } else {
   // Si es menor a cero, no realiza la lógica de cambiarBox
   console.log('La diferencia es menor a cero, no se realiza cambiarBox');
 }
     };
   const cambiarBox2 = () => { 
     setTotal(0);
     setFormDatas({
       cliente: '',
       puntos: '',
       producto: '',
       puntosG: '',
       efectivo: '',
       transferencia: '',
       vdRegalo: '',
       cheque: '',
       tdDebito: '',
       tdCredito: '',
       monto: '',
       money:'',
       moneyG:'',
     });  
       setMostrarBox1(!mostrarBox1);
     };
   // const cambiarBox1 = () =>{
   //   setMostrarBox2(!mostrarBox2)
   // }
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const handleResize = () => {
       setWindowWidth(window.innerWidth);
     };
     useEffect(() => {
       // Agregar un listener para el evento de cambio de tamaño de la ventana
       window.addEventListener('resize', handleResize);
       // Limpiar el listener cuando el componente se desmonta
       return () => {
         window.removeEventListener('resize', handleResize);
       };
     }, []);
return(
<div>
{windowWidth > 759 ? (
<div className="containeri">            
  <div className="container1 border">  
      <div><strong>Resumen de la orden</strong></div>
        <div>
          <p><strong>Cliente:  </strong> Cesar Armando Castillo Coronado</p>
          <strong>Compra final:</strong>
          <div className='tae' style={{ margin: '0 auto', textAlign: 'center' }}>                    
          {imageData.map((data) => (
            <div>
              <table>
                <table>
                  <thead>
                    <tr>
                      <th colSpan={2} style={{ textAlign: 'left' , width: '300px' }}> <strong>{data.name.substring(0, 15)}</strong> </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'left' }}>{data.id} x ${parseFloat(calcularPrecioConDescuento(data.precio, data.porcentaje)).toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }}> {(Number(calcularPrecioConDescuento(data.precio, data.porcentaje)) * Number(data.id)).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>   
              </table>
            </div>
          ))} 
          </div>
        </div>
        <div><strong>Detalles de la orden</strong></div>
          <div>
            <p><strong>Subtotal:</strong> ${totalSubtotal.toFixed(2)}</p>
            <p><strong>Ahorrando:</strong> ${totalAhorro.toFixed(2)}</p>
            <p><strong>Impuesto:</strong> ${calcularMontoIVA()}</p>
            <p><strong>Puntos ganados:</strong> {((Number(calcularMontoIVA()) + Number(totalSubtotal))/100).toFixed(2)}</p>
            <p><strong>Total: </strong> ${(parseFloat(calcularMontoIVA()) + Number(totalSubtotal)).toFixed(2)}</p>
          </div>   
  </div>
  <div className="container2">
    <div className='conteiner1'>
      <div>
        <div className='conteiner1'>
          <div>
            <div className='letras'><strong>Opciones de pago</strong></div>
              <div className='containerPs'>
                <form className="formi" onSubmit={handleTotal}>
                  <input type="text" required  value={(total)} />
                  <label className="lbl-nombrei" >
                    <span className='text-nombi coloricon'>
                      Dinero Recibido
                    </span>
                  </label>
                </form>
                <form className="formii">
                  <input type="text" required value={Math.max((parseFloat(calcularMontoIVA()) + Number(totalSubtotal))- total,0).toFixed(2)}/>
                    <label className="lbl-nombreii">
                      <span className='text-nombii coloricon'>
                        Dinero Restante
                      </span>
                    </label>
                </form>
                <CustomButton customClass='btn btn-primary totales' buttonType='button' handleClick={handleVenta} title={'Cierre'}/>
                <CustomButton customClass='btn btn-warning colorBa' buttonType='button' handleClick={cambiarBox} title={<IoArrowBack />}/>
                <CustomButton customClass='btn btn-danger colorCe' buttonType='button' handleClick={handleCerrarClick} title={'x'}/>
              </div>
              <div className="containerP">
                <div style={{ marginRight: '10px', marginLeft:'10px' }}>
                  <label className='black'>Efectivo</label>
                    <CustomInputs type="text" id='efectivo' name='efectivo' value={formDatas.efectivo} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>Transferencia</label>
                    <CustomInputs type="text" id='transferencia' name='transferencia' value={formDatas.transferencia} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>Vale</label>
                    <CustomInputs type="text" value={formDatas.moneyG} onClick={mostrarFormularioss} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>Cheque</label>
                    <CustomInputs type="text" id='cheque' name='cheque' value={formDatas.cheque} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>T.Debito</label>
                    <CustomInputs type="text" id='tdDebito' name='tdDebito' value={formDatas.tdDebito} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>T.Credito</label>
                    <CustomInputs type="text" id='tdCredito' name='tdCredito' value={formDatas.tdCredito} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>Puntos</label>
                    <CustomInputs type='text' value={formDatas.puntosG} onClick={mostrarFormulariosss}/>
                </div>
              </div>
            <div className='containerPs'>
            {mostrarss && (
              <div className='containerTr shadow-lg'>
                <p className='p'><strong> "Vale" </strong></p>
                <p className='p'><strong>Dinero: </strong>{formDatas.money}</p>
                <p className='p'><strong>D. gastado: </strong>{formDatas.moneyG}</p>
                <p className='p'><strong>Dinero restante: </strong>{Math.max(Number(formDatas.money) - Number(formDatas.moneyG), 0)}</p>
                <div className='containerr1' style={{ marginLeft:'30px', marginRight: '30px' }}>
                  <label htmlFor="precio"><strong>Dinero electronico</strong></label>
                  <CustomInputs type="text" id='money' name='money' value={formDatas.money} onChange={handleInputChang}/>
                </div>
                <div className='containerr1' style={{ marginLeft:'30px', marginRight: '30px' }}>
                  <label htmlFor="precio"><strong>Dinero a gastar</strong></label>
                  <CustomInputs type="text" id='moneyG' name='moneyG' value={formDatas.moneyG} onChange={(e) => {
                    const newValue = Math.min(Number(e.target.value), Number(formDatas.money));
                    handleChangeWrapper({ target: { name: 'moneyG', value: newValue.toString() } });
                    }}/>
                </div>
                <CustomButton customClass='btn' buttonType='button' handleClick={() => setMostrarss(false)} title={'x'}/>
              </div> 
            )}                                                                                                                                                    
            <div className='conteiner2'>
              <div className='ppp'><strong>Dinero Recibido</strong></div>
              <div>
                <div className='ppp'><strong>Recibo:</strong></div>
                  <p className='pp'>Efectivo: {formDatas.efectivo}</p>
                  <p className='pp'>Transferencia: {formDatas.transferencia}</p>
                  <p className='pp'>V. de regalo: {formDatas.moneyG}</p>
                  <p className='pp'>Cheque: {formDatas.cheque}</p>
                  <p className='pp'>T. de Debito: {formDatas.tdDebito}</p>
                  <p className='pp'>T. de credito: {formDatas.tdCredito}</p>
                  <p className='pp'>Puntos: {formDatas.puntosG}</p>
                  <strong className='ppp'>Cambio: </strong><p className='pp'>{(total - (parseFloat(calcularMontoIVA()) + Number(totalSubtotal))).toFixed(2)}</p>
              </div>
              <form onSubmit={handleTotal}>
                <CustomButton customClass='btn btn-success colorCo' buttonType='submit' onClick={handleTotal} title={'Pagar'}/>
              </form> 
            </div>
            {mostrarsss && (
            <div className='containerTr shadow-lg '>
              <p className='p'><strong> "Puntaje" </strong></p>
              <p className='p'><strong>Puntos: </strong>{formDatas.puntos}</p>
              <p className='p'><strong>P. gastados: </strong>{formDatas.puntosG}</p>
              <p className='p'><strong>Puntos restantes: </strong>{Math.max(Number(formDatas.puntos) - Number(formDatas.puntosG), 0)}</p>
            <div className='containerr1' style={{ marginLeft:'30px', marginRight: '30px' }}>
              <label htmlFor="precio"><strong>Puntos acumulados</strong></label>
              <CustomInputs type="text" id='puntos' name='puntos' value={formDatas.puntos} onChange={handleInputChang}/>
            </div>
            <div className='containerr1' style={{ marginLeft:'30px', marginRight: '30px' }}>
              <label htmlFor="precio"><strong>Puntos a gastar</strong></label>
              <CustomInputs type="text" id='puntosG' name='puntosG' value={formDatas.puntosG} onChange={(e) => {
                    const newValue = Math.min(Number(e.target.value), Number(formDatas.puntos));
                    handleChangeWrapperr({ target: { name: 'puntosG', value: newValue.toString() } });
                    }}/>
            </div>
            <CustomButton customClass='btn' buttonType='button' handleClick={() => setMostrarsss(false)} title={'x'}/>
            </div>              
            )}
            </div>
          </div>    
        </div>    
      </div>   
    </div>
  </div>   
</div>
      
):(

<div className="containeri">            
  <div className="container2">
    <div className='conteiner1'>
      <div>
        <div className='conteiner1'>
          <div>
            <div className='letras'><strong>Opciones de pago</strong></div>
              <div className='containerPs'>
              <form className="formi" onSubmit={handleTotal}>
                  <input type="text" required  value={total}/>
                    <label className="lbl-nombrei" >
                      <span className='text-nombi coloricon'>
                        Dinero Recibido
                      </span>
                    </label>
                </form>
                <form className="formii">
                  <input type="text" required value={Math.max((parseFloat(calcularMontoIVA()) + Number(totalSubtotal))- total).toFixed(2)}/>
                    <label className="lbl-nombreii">
                      <span className='text-nombii coloricon'>
                        Dinero Restante
                      </span>
                  </label>
                </form>
                <CustomButton customClass='btn btn-primary totales' buttonType='button' handleClick={handleVenta} title={'Cierre'}/>
                <CustomButton customClass='btn btn-warning colorBa' buttonType='button' handleClick={cambiarBox} title={<IoArrowBack />}/>
                <CustomButton customClass='btn btn-danger colorCe' buttonType='button' handleClick={handleCerrarClick} title={'x'}/>
              </div>
              <div className="containerP">
                <div style={{ marginRight: '10px', marginLeft:'10px' }}>
                  <label className='black'>Efectivo</label>
                    <CustomInputs type="text" id='efectivo' name='efectivo' value={formDatas.efectivo} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>Transferencia</label>
                    <CustomInputs type="text" id='transferencia' name='transferencia' value={formDatas.transferencia} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>Vale</label>
                    <CustomInputs type="text" value={formDatas.moneyG} onClick={mostrarFormularioss} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>Cheque</label>
                    <CustomInputs type="text" id='cheque' name='cheque' value={formDatas.cheque} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>T.Debito</label>
                    <CustomInputs type="text" id='tdDebito' name='tdDebito' value={formDatas.tdDebito} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>T.Credito</label>
                    <CustomInputs type="text" id='tdCredito' name='tdCredito' value={formDatas.tdCredito} onChange={handleInputChang}/>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <label className='black'>Puntos</label>
                    <CustomInputs type='text' value={formDatas.puntosG} onClick={mostrarFormulariosss}/>
                </div>
              </div>
            <div className='containerPs'>
              {mostrarss && (
              <div className='containerTr shadow-lg'>
                <p className='p'><strong> "Vale" </strong></p>
                <p className='p'><strong>Dinero: </strong>{formDatas.money}</p>
                <p className='p'><strong>D. gastado: </strong>{formDatas.moneyG}</p>
                <p className='p'><strong>Dinero restante: </strong>{Math.max(Number(formDatas.money) - Number(formDatas.moneyG), 0)}</p>
                <div className='containerr1' style={{ marginLeft:'10px', marginRight: '10px' }}>
                  <label htmlFor="precio"><strong>Dinero electronico</strong></label>
                  <CustomInputs type="text" id='money' name='money' value={formDatas.money} onChange={handleInputChang}/>
                </div>
                <div className='containerr1' style={{ marginLeft:'10px', marginRight: '10px' }}>
                  <label htmlFor="precio"><strong>Dinero a gastar</strong></label>
                  <CustomInputs type="text" id='moneyG' name='moneyG' value={formDatas.moneyG} onChange={(e) => {
                    const newValue = Math.min(Number(e.target.value), Number(formDatas.money));
                    handleChangeWrapper({ target: { name: 'moneyG', value: newValue.toString() } });
                    }}/>
                </div>
                <CustomButton customClass='btn' buttonType='button' handleClick={() => setMostrarss(false)} title={'x'}/>
              </div> 
              )}  
              <div className="container1 border"> 
                <div>
                  <div><strong>Resumen de la orden</strong></div>
                    <div>
                      <p> <strong>Cliente:  </strong> Cesar Armando Castillo Coronado</p>
                      <strong>Compra final:</strong>
                      <div className='taechico'>                               
                      {imageData.map((data) => (
                      <div>
                        <table>
                          <tbody>
                            <tr>
                             <td colSpan={2} style={{ textAlign: 'left' , width: '300px' }}><strong>{data.name.substring(0, 15)}</strong></td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: 'left' }}>{data.id} x ${parseFloat(calcularPrecioConDescuento(data.precio, data.porcentaje)).toFixed(2)}</td>
                              <td style={{ textAlign: 'right' }}> {(Number(calcularPrecioConDescuento(data.precio, data.porcentaje)) * Number(data.id)).toFixed(2)}</td>
                            </tr>
                          </tbody>
                      </table>   
                      </div>
                      ))}</div>
                    </div>
                  <div><strong>Detalles de la orden</strong></div>
                  <div>
                    <p><strong>Subtotal:</strong> ${totalSubtotal.toFixed(2)}</p>
                    <p><strong>Ahorrando:</strong> ${totalAhorro.toFixed(2)}</p>
                    <p><strong>Impuesto:</strong> ${calcularMontoIVA()}</p>
                    <p><strong>Puntos ganados:</strong> {( (Number(calcularMontoIVA()) + Number(totalSubtotal))/100).toFixed(2)}</p>
                    <p><strong>Total: </strong> ${(parseFloat(calcularMontoIVA()) + Number(totalSubtotal)).toFixed(2)}</p>
                  </div>
                </div>
              </div>                                                                                                                                        
              <div className='conteiner2'>
                <div className='ppp'><strong>Dinero Recibido</strong></div>
                <div>
                  <div className='ppp'><strong>Recibo:</strong></div>
                    <p className='pp'>Efectivo: {formDatas.efectivo}</p>
                    <p className='pp'>Transferencia: {formDatas.transferencia}</p>
                    <p className='pp'>V. de regalo: {formDatas.moneyG}</p>
                    <p className='pp'>Cheque: {formDatas.cheque}</p>
                    <p className='pp'>T. de Debito: {formDatas.tdDebito}</p>
                    <p className='pp'>T. de credito: {formDatas.tdCredito}</p>
                    <p className='pp'>Puntos: {formDatas.puntosG}</p>
                    <strong className='ppp'>Cambio: </strong><p className='pp'>{(total - (parseFloat(calcularMontoIVA()) + Number(totalSubtotal))).toFixed(2)}</p>
                </div>
                
                <form onSubmit={handleTotal}>
                <CustomButton customClass='btn btn-success colorCo' buttonType='submit' onClick={handleTotal} title={'Pagar'}/>
                </form> 
              </div> 
              {mostrarsss && (
              <div className='containerTr shadow-lg '>
                <p className='p'><strong> "Puntaje" </strong></p>
                <p className='p'><strong>Puntos: </strong>{formDatas.puntos}</p>
                <p className='p'><strong>P. gastados: </strong>{formDatas.puntosG}</p>
                <p className='p'><strong>Puntos restantes: </strong>{Math.max(Number(formDatas.puntos) - Number(formDatas.puntosG), 0)}</p>
                <div className='containerr1' style={{ marginLeft:'10px', marginRight: '10px' }}>
                  <label htmlFor="precio"><strong>Puntos acumulados</strong></label>
                  <CustomInputs type="text" id='puntos' name='puntos' value={formDatas.puntos} onChange={handleInputChang}/>
                </div>
                <div className='containerr1' style={{ marginLeft:'10px', marginRight: '10px' }}>
                  <label htmlFor="precio"><strong>Puntos a gastar</strong></label>
                  <CustomInputs type="text" id='puntosG' name='puntosG' value={formDatas.puntosG} onChange={(e) => {
                    const newValue = Math.min(Number(e.target.value), Number(formDatas.puntos));
                    handleChangeWrapperr({ target: { name: 'puntosG', value: newValue.toString() } });
                    }}/>
                </div>
                <CustomButton customClass='btn' buttonType='button' handleClick={() => setMostrarsss(false)} title={'x'}/>
              </div>            
              )} 
            </div>
          </div>    
        </div>
      </div>
    </div>
  </div>
</div>
)
}  
{showConfirmations && (
  <div className='caj'>
    <div className="caja border shadow-lg">
      <header>Cierre de caja</header>
        <div className='containerCaja'>
          <table className='table'>
            <thead>
              <tr>
                <th>Total de Transferencias</th>
                <th>Total de los Vales de regalo</th>
                <th>Total de los Cheques</th>
                <th>Total de las Tarjetas de Debito</th>
                <th>Total de las Tarjetas de crédito</th>
                <th>Total de los Puntos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalTransferencia}</td>
                <td>{totalMoneyG}</td>
                <td>{totalCheque}</td>
                <td>{totalTdDebito}</td>
                <td>{totalTdCredito}</td>
                <td>{totalPuntosG}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className='table'>
            <thead>
              <tr>
                <th>Total de venta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalAcumulado}</td>
              </tr>
            </tbody>
          </table>
        <div className='containerASE'>
          <div style={{ marginRight: '10px' }}>
            <label htmlFor="name">Apertura de caja:</label> 
              <CustomInputs type='number' onChange={handleInputtChange}/>
          </div>
          <div style={{ marginRight: '10px' }}>
            <label htmlFor="precio">Total de dinero en efectivo:</label>
              <CustomInputs type='number' onChange={handleInputChang}/>
          </div>
          <div style={{ marginRight: '10px' }}>
            <label htmlFor="id">Total de salidas de efectivo</label>
              <CustomInputs type='number' onChange={handleInputtChange}/>
          </div>
        </div>
        <CustomButton customClass='btn btn-success colorCo' buttonType='button' handleClick={handleGuardarClick} title={'Guardar'}/>
        <CustomButton customClass='btn btn-danger colorCe' buttonType='button' handleClick={handleCerrar} title={'Cerrar'}/>
    </div>
  </div>
)}
{showConfirmation && (
  <div className='caj1'>
    <div className="caja1 border shadow-lg">
      <label>¿Estás seguro de que quieres cerrar la aplicación?</label>
        <CustomInputs value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
        <CustomButton customClass='btn btn-success colorCo' buttonType='button' handleClick={handleAceptarClick} title={'Si'}/>
        <CustomButton customClass='btn btn-danger colorCe' buttonType='button' handleClick={handleCancelarClick} title={'No'}/>
    </div>
  </div>
)}  
</div>
  )
}
export default puntodeVenta