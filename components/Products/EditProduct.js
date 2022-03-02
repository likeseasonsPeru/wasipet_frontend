import React, {
    useState
} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import {
    TextField,
    TextareaAutosize,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@material-ui/core';
import {
  getCookie
} from '../../utils/cookie';
import useImageForm from './userImageForm'
import {API} from '../../config'
import {SELECT_OPTIONS} from '../../utils/selectCategory'

const EditProduct = ({
        product,
        brands
    }) => {
        const [token] = useState(getCookie('token'))
        const [modal, setModal] = useState(false)
        const [name, setName] = useState(product.name || '')
        const [brand, setBrand] = useState(product.brand || '')
        const [description, setDescription] = useState(product.description || '')
        const [medicado, setMedicado] = useState(product.medicado || false)
        const [petType, setPetType] = useState(product.petType || '')
        const [weight, setWeight] = useState(product.weight || '') //foto
        const [pointsTrade, setPointsTrade] = useState(product.pointsTrade || '')
        const [pointsValue, setPointsValue] = useState(product.pointsValue || '')
        const [id] = useState(product._id || '')
        const [experimentoCyber, imageExperimentInput, setInputFile] = useImageForm({
            placeholder: 'Ingrese la imagen del producto',
            name: 'image',
            label: "Sube una imagen (Medida recomendada: 400x600px, Formato: png sin fondo)",
            medida: 'Medida recomendada:'
        });

        //Select Filtros
        const [category, setCategory] = useState(product.category || '')
        const [multiSelect, setMultiSelect] = useState(false)
        const [options_TypeDescription, setOptions_TypeDescription] = useState(null)
        const [typeDescription, setTypeDescription] = useState(product.type_description || '')
        const [options_TypeDetailCategory, setOptions_TypeDetailCategory] = useState(null)
        const [typeDetailCategory, setTypeDetailCategory] = useState(product.type_detail_category || '')
        const [options_TypeDetailDescription, setOptions_TypeDetailDescription] = useState(null)
        const [typeDetailDescription, setTypeDetailDescription] = useState(product.type_detail_description || '')
        React.useEffect(() => {
          setOptions_TypeDetailCategory(null);
          setOptions_TypeDetailDescription(null);
          const options_subcategory = SELECT_OPTIONS.filter(categoria => categoria.name === category)

           //type_description
          if(options_subcategory.length){
            if(options_subcategory[0].multiselect === true){
              setMultiSelect(true)
              let valuesSelect ;
              if(typeof typeDescription === 'object'){
                valuesSelect = typeDescription;
              }else{
                valuesSelect = typeDescription.split(',');  
              }
              setTypeDescription(valuesSelect)

            }else{
              setMultiSelect(false)
            }
            setOptions_TypeDescription(options_subcategory[0].categories)
          }

          //type_detail_category
          const categories = options_subcategory[0].categories
          const object_subcategories = categories.filter(subcategory => subcategory.name === typeDescription)
          if(object_subcategories.length){
            if(object_subcategories && typeof object_subcategories[0].subcategories != null){
              setOptions_TypeDetailCategory(object_subcategories[0].subcategories);
            }
          }

          //type_detail_description
          if(object_subcategories.length && typeDetailCategory){
            const subcategories = object_subcategories[0].subcategories
            if(subcategories.length){
              const subcategories_description = subcategories.filter(subcategory_description => subcategory_description.name === typeDetailCategory)
              if(subcategories_description.length){
                if(subcategories_description && typeof subcategories_description[0].subcategories_description != null){
                  setOptions_TypeDetailDescription(subcategories_description[0].subcategories_description);
                }
              }
            }
          }
        }, [category, typeDescription, typeDetailCategory])

        const toggle = () => {
            //this.getUser();
            setModal(!modal);
        }

        const editProduct = async () => {
          const data = {
              name,
              brand,
              active:product.active,
              description ,
              medicado,
              petType,
              weight,
              pointsTrade,
              pointsValue,
              image:experimentoCyber, //image
              category,
              type_description: typeof typeDescription === 'object' ? typeDescription.join(',') : typeDescription,
              type_detail_category: typeDetailCategory,
              type_detail_description: typeDetailDescription,
          }
          try {
            var headers = {
                'Authorization': 'Bearer ' + token
            }
            let dataToSend = new FormData();
             Object.keys(data).forEach(key => {
                console.log('Key->', key)
                dataToSend.append(key, data[key]);
            });
            // Where we're fetching data from
            await fetch(`${API}/product/${product._id}`, {
                    method: 'PUT',
                    headers: headers,
                    body: dataToSend
                })
                // We get the API response and receive data in JSON format...
                .then(response => response.json())
                // ...then we update the users state
                .then(data => {
                  window.location.reload();
                })
            } catch (error) {
            console.log("unable -> error", error)
            }
        }

        React.useEffect(() => {
          const url_img = `https://wasipetapp.com/api/public/${product.type}`
          setInputFile(url_img);
        }, [])



    return (

        <div>
            <Button color="info" onClick={() => toggle()}>Editar</Button>
            <Modal isOpen={modal} toggle={()=> toggle()} style={{marginTop:"90px"}}>
            <ModalHeader toggle={() => toggle()}>DATOS</ModalHeader>
            <ModalBody>
              <FormControl style={{width: '100%'}}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Nombre del Producto"
                    name="name"
                    type="text"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="colorInputDisabled"
                />
              </FormControl>
              <FormControl style={{width: '100%'}}>
              <h6>Descripción del producto:</h6>
                <TextareaAutosize
                    rowsMax={6}
                    aria-label="maximum height"
                    labelId='label-description'
                    placeholder="Descripción"
                    style={{width: '100%'}}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
              </FormControl>
              <FormControl style={{width: '100%', marginTop: '15px'}}>
                <InputLabel id="label-brand">Marca del producto</InputLabel>
                <Select
                    value={brand}
                    labelId="label-brand"
                    onChange={e => setBrand(e.target.value)}
                    displayEmpty
                    style={{width: '100%'}}
                    >
                        <MenuItem value="" disabled>
                            Seleccione marca
                        </MenuItem>
                        {
                          brands && brands.length ? 
                              brands.map(brand => 
                                <MenuItem value={brand.name}>{brand.name}</MenuItem>
                              ) : null
                        }
                </Select>
              </FormControl>
              <FormControl style={{width: '100%', marginTop: '15px'}}>
                <InputLabel id="label-medicado">Estado Medicado</InputLabel>
                <Select
                    value={medicado}
                    labelId="label-medicado"
                    onChange={e => setMedicado(e.target.value)}
                    displayEmpty
                    style={{width: '100%'}}
                    >
                        <MenuItem value="" disabled>
                            Seleccione estado
                        </MenuItem>
                        <MenuItem value={true}>Producto Medicado</MenuItem>
                        <MenuItem value={false}>Producto No Medicado</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{width: '100%', marginTop: '15px'}}>
                <InputLabel id="label-petType">Tipo de mascota</InputLabel>
                <Select
                    value={petType}
                    labelId="label-petType"
                    onChange={e => setPetType(e.target.value)}
                    displayEmpty
                    style={{width: '100%'}}
                    >
                        <MenuItem value="" disabled>
                            Seleccione Tipo
                        </MenuItem>
                        <MenuItem value={'Dog'}>Perro</MenuItem>
                        <MenuItem value={'Cat'}>Gato</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{width: '100%'}}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="weight"
                    label="Peso del producto"
                    name="weight"
                    type="text"
                    autoFocus
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                    className="colorInputDisabled"
                />
              </FormControl>
              <FormControl style={{width: '100%'}}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="pointsTrade"
                    label="Costo del producto al canjear"
                    name="pointsTrade"
                    type="number"
                    autoFocus
                    onChange={e => setPointsTrade(e.target.value)}
                    value={pointsTrade}
                    className="colorInputDisabled"
                />
              </FormControl>
              <FormControl style={{width: '100%'}}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="pointsValue"
                    label="Valor al escanear"
                    name="pointsValue"
                    type="number"
                    autoFocus
                    onChange={e => setPointsValue(e.target.value)}
                    value={pointsValue}
                    className="colorInputDisabled"
                />
              </FormControl>
              <FormControl style={{width: '100%', marginTop: '15px'}}>
                <InputLabel id="label-category">Categoría del Producto</InputLabel>
                <Select
                    value={category}
                    labelId="label-category"
                    onChange={e => setCategory(e.target.value)}
                    displayEmpty
                    style={{width: '100%'}}
                    >
                        <MenuItem value="" disabled>
                            Seleccione marca
                        </MenuItem>
                        {
                          SELECT_OPTIONS ? 
                              SELECT_OPTIONS.map(category => 
                                <MenuItem value={category.name}>{category.name}</MenuItem>
                              ) : null
                        }
                </Select>
              </FormControl>
              <FormControl style={{width: '100%', margin: '15px 0px'}}>
                <InputLabel id="label-subcategoria">SubCategoria del Producto</InputLabel>
                <Select
                    value={typeDescription}
                    labelId="label-subcategoria"
                    onChange={e => setTypeDescription(e.target.value)}
                    displayEmpty
                    multiple={multiSelect}
                    style={{width: '100%'}}
                    >
                        <MenuItem value="" disabled>
                            Seleccione SubCategoria
                        </MenuItem>
                        {
                          options_TypeDescription ? 
                          options_TypeDescription.map(subcategory => 
                                <MenuItem value={subcategory.name}>{subcategory.name}</MenuItem>
                              ) : null
                        }
                </Select>
              </FormControl>
              <FormControl style={{width: '100%', marginBottom: '15px'}}>
                <InputLabel id="label-tipo-de-subcategoria" style={{transform: 'translate(0, 0px) scale(0.8)'}}>Tipo de Subcategoria del Producto</InputLabel>
                <Select
                    value={typeDetailCategory}
                    labelId="label-tipo-de-subcategoria"
                    onChange={e => setTypeDetailCategory(e.target.value)}
                    displayEmpty
                    style={{width: '100%'}}
                    >
                        <MenuItem value="" disabled>
                            Seleccione Tipo de Subcategoria
                        </MenuItem>
                        {
                          options_TypeDetailCategory ? 
                          options_TypeDetailCategory.map(subcategory => 
                                <MenuItem value={subcategory.name}>{subcategory.name}</MenuItem>
                              ) : null
                        }
                </Select>
              </FormControl>
              <FormControl style={{width: '100%', marginBottom: '15px'}}>
                <InputLabel id="label-tipo-de-subcategoria-description" style={{transform: 'translate(0, 0px) scale(0.8)'}}>Tipo de Descripción de SubCategoría del Producto</InputLabel>
                <Select
                    value={typeDetailDescription}
                    labelId="label-tipo-de-subcategoria-description"
                    onChange={e => setTypeDetailDescription(e.target.value)}
                    displayEmpty
                    style={{width: '100%'}}
                    >
                        <MenuItem value="" disabled>
                            Seleccione Descripción de Tipo de Subcategoría
                        </MenuItem>
                        {
                          options_TypeDetailDescription ? 
                          options_TypeDetailDescription.map(subcategory_description => 
                                <MenuItem value={subcategory_description.name}>{subcategory_description.name}</MenuItem>
                              ) : null
                        }
                </Select>
              </FormControl>
              <FormControl style={{width: '100%'}}>
                {
                    product  ?
                    imageExperimentInput : null 
                }
              </FormControl>
             
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => editProduct()}>Guardar Cambios</Button>
              <Button color="secondary" onClick={() => toggle()}>Cerrar</Button>
            </ModalFooter>
          </Modal>
            
        </div>
    );
}

export default EditProduct;