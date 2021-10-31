import React from 'react';
import './App.css';

interface CoffeeShop{
    id: number;
    name: string;
    address: string;
    internetReliability: number;
    phone: string;
    powerAccessible: boolean;
    priceOfCoffee: number;

}

interface State {
    isLoading: boolean;
    coffeeShops: CoffeeShop[];
}

class App extends React.Component {
  state: State = {
    isLoading: true,
    coffeeShops: []
  };

  async componentDidMount() {
    const response = await fetch('/api/coffeeshops');
    const body = await response.json();
    this.setState({coffeeShops: body._embedded.coffeeshops, isLoading: false});
  }

  render() {
    const {coffeeShops, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <h2>Coffee Shop List</h2>
            {coffeeShops.map(coffeeShop =>
              <div key={coffeeShop.id}>
                {coffeeShop.name} - {coffeeShop.address}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}


export default App;
