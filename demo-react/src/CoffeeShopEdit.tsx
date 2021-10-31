import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Alert, Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {CoffeeShop} from './models';
import {RouteComponentProps} from 'react-router';


interface CustomProps {
  navbar: React.ReactElement;
  api: any;
}

interface Params {
  id: string;
}

interface State {
  item: CoffeeShop;
  errorMessage?: string;
  isCreate: boolean;
}

type Props = CustomProps & RouteComponentProps<Params>;

const emptyItem: CoffeeShop = {
  id: -1,
  name: '',
  address: '',
  phone: '',
  priceOfCoffee: 0,
  powerAccessible: false,
  internetReliability: 0
};

const emptyState: State = {
  item: emptyItem,
  isCreate: false
}

const CoffeeShopEdit: React.FunctionComponent<Props> = props => {

  const [state, setState] = React.useState(emptyState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget
    setState(prevState => {
      const updatedShop = {...prevState.item, [name]: value};
      return {...prevState, item: updatedShop};
    })
  }

  React.useEffect(() => {
    const isCreate = props.match.params.id === 'new'; // are we editing or creating?
    setState(prevState => ({...prevState, isCreate}));
    const getData = async () => {
      if (!state.isCreate) {
        const response = await props.api.getById(props.match.params.id);
        const coffeeShop = await response.json();
        setState(prevState => ({...prevState, item: coffeeShop}));
      }
    }
    getData();
  }, [props.api, props.match.params.id, state.isCreate])

  const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    let result = state.isCreate ? await props.api.create(state.item) : await props.api.update(state.item);
    if (!result.ok) {
      setState(prevState => ({...prevState, errorMessage: `Failed to ${state.isCreate ? 'create' : 'update'} record: ${result.status} ${result.statusText}`}))
    } else {
      setState(prevState => ({...prevState, errorMessage: undefined}));
      props.history.push('/coffee-shops');
    }
  }

  const title = <h2>{state.isCreate ? 'Add Coffee Shop' : 'Edit Coffee Shop'}</h2>;

  return (
    <div>
      {props.navbar}
      <Container style={{textAlign: 'left'}}>
        {title}
        {state.errorMessage ?
          <Alert color="warning">
            {state.errorMessage}
          </Alert> : null
        }
        <Form>
          <div className="row">
            <FormGroup className="col-md-8 mb-3">
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" value={state.item.name || ''}
                onChange={handleChange} autoComplete="name" />
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="phone">Phone</Label>
              <Input type="text" name="phone" id="phone" value={state.item.phone || ''}
                onChange={handleChange} autoComplete="phone" />
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={state.item.address || ''}
              onChange={handleChange} autoComplete="address-level1" />
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="priceOfCoffee">Price of Coffee</Label>
              <Input type="text" name="priceOfCoffee" id="priceOfCoffee" value={state.item.priceOfCoffee || ''}
                onChange={handleChange} />
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="powerAccessible">Power Accessible?</Label>
              <Input type="select" name="powerAccessible" id="powerAccessible"
                value={state.item.powerAccessible ? 'true' : 'false'}
                onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Input>
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="internetReliability">Internet Reliability</Label>
              <Input type="select" name="internetReliability" id="internetReliability"
                value={state.item.internetReliability || '-'}
                onChange={handleChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option value="-">-</option>
              </Input>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit" onClick={handleFormSubmit}>Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/coffee-shops">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default withRouter(CoffeeShopEdit);
