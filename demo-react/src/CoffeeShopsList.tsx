import React from 'react';
import {Alert, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {CoffeeShop} from './models';

interface CoffeeShopRemovable extends CoffeeShop {
  remove(id: number): Promise<void>
}

const CoffeeShopComponent = (props: CoffeeShopRemovable) => (
  <div className="coffeeshop-container p-2 m-2 d-flex flex-column">
    <h3>{props.name}</h3>
    <div className="coffeeshop-body">
      <div className="subtitle-container">
        <div>Cost: ${props.priceOfCoffee} / cup</div>
        <div>Internet Reliability: {props.internetReliability} / 5 </div>
        <div>{props.powerAccessible ? 'Power Accessible' : 'Power NOT Accessible'} </div>
      </div>
      <div>{props.address}</div>
      <div>{props.phone}</div>
    </div>
    <div className="coffeeshop-footer">
      <Button color="secondary" tag={Link} to={'/coffee-shops/' + props.id}>Edit</Button>
      <Button color="danger" onClick={() => props.remove(props.id)}>Delete</Button>
    </div>
  </div>
);


interface CoffeeShopsListProps {api: any, navbar: React.ReactElement}
interface CoffeeShopsListState {coffeeShops: CoffeeShop[], isLoading: boolean, errorMessage?: string}
const emptyState: CoffeeShopsListState = {coffeeShops: [], isLoading: true};

const CoffeeShopsList: React.FunctionComponent<CoffeeShopsListProps> = props => {

  const [state, setState] = React.useState(emptyState);

  React.useEffect(() => {
    setState(prevState => ({...prevState, isLoading: true}));
    const execute = async () => {
      const response = await props.api.getAll();
      if (!response.ok) {
        setState(prevState => ({
          ...prevState,
          errorMessage: `Failed to load coffee shops: ${response.status} ${response.statusText}`,
          isLoading: false
        }
        ));
      }
      else {
        const body = await response.json();
        const coffeeShops = body._embedded.coffeeshops;
        setState(prevState => ({
          ...prevState,
          coffeeShops: coffeeShops,
          isLoading: false
        }));
      }
    }
    execute();
  }, [props.api]);

  const remove = async (id: number) => {
    let response = await props.api.delete(id);
    if (!response.ok) {
      setState(prevState => ({...prevState, errorMessage: `Failed to delete coffee shop: ${response.status} ${response.statusText}`}));
    }
    else {
      let updatedCoffeeShops = state.coffeeShops.filter(i => i.id !== id);
      setState(prevState => ({...prevState, coffeeShops: updatedCoffeeShops}));
    }
  }

  if (state.isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        {props.navbar}
        <div className="d-flex flex-row justify-content-between p-3">
          <h3 className="coffee-shops-title">Coffee Shops</h3>
          <Button color="success" tag={Link} to="/coffee-shops/new">Add New</Button>
        </div>
        {state.errorMessage ?
          <div className="d-flex flex-row justify-content-center">
            <Alert color="warning" style={{flex: 1, maxWidth: '80%'}}>
              {state.errorMessage}
            </Alert>
          </div> : null
        }
        <div className="d-flex flex-row flex-container flex-wrap justify-content-center">
          {state.coffeeShops.map(coffeeShop =>
            <CoffeeShopComponent {...coffeeShop} remove={remove.bind(this)} key={coffeeShop.id} />
          )}
          {!state.coffeeShops || state.coffeeShops.length === 0 ? <p>No coffee shops!</p> : null}
        </div>
      </div>
    );
  }
}

export default CoffeeShopsList;
