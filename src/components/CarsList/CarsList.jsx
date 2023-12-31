import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCars,
  selectIsLoading,
  selectError,
  selectFilter,
} from 'redux/selectors';

import CarsListItem from 'components/CarsListItem/CarsListItem';
import css from './CarsList.module.css';

function CarsList() {


  const [pageSize, setPageSize] = useState(8);
  const items = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const { brand, price, mileageFrom, mileageTo, isFiltered } = useSelector(selectFilter);

  const handleLoadMore = () => {
    setPageSize(pageSize + 8);
  };

  let filteredCars = [...items];
  
  if (brand !== "") {
    filteredCars = filteredCars.filter(
      item => item.make.toLowerCase() === brand.toLowerCase()
    );
  }

  if (price !== "") {
    filteredCars = filteredCars.filter(
      item => parseInt(item.rentalPrice.substring(1)) <= parseInt(price)
    );
  }

  if (mileageFrom !== '') {
    filteredCars = filteredCars.filter(item => item.mileage >= mileageFrom);
  }

  if (mileageTo !== '') {
    filteredCars = filteredCars.filter(item => item.mileage <= mileageTo);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return 'Error: ' + error;
  }

  if (
    isFiltered === true &&
    (brand !== '' || price !== '' || mileageFrom !== '' || mileageTo !== '')
  ) {
    return (
      <>
        <ul className={css.carsList}>
          {filteredCars.map(
            ({
              id,
              img,
              make,
              model,
              year,
              rentalPrice,
              address,
              rentalCompany,
              type,
              mileage,
              accessories,
            }) => (
              <li className={css.carsListItem} key={id}>
                <CarsListItem
                  id={id}
                  img={img}
                  make={make}
                  model={model}
                  year={year}
                  rentalPrice={rentalPrice}
                  address={address}
                  rentalCompany={rentalCompany}
                  type={type}
                  mileage={mileage}
                  accessories={accessories}
                />
              </li>
            )
          )}
        </ul>
      </>
    );
  }

  return (
    <>
      <ul className={css.carsList}>
        {items
          .slice(0, pageSize)
          .map(
            ({
              id,
              img,
              make,
              model,
              year,
              rentalPrice,
              address,
              rentalCompany,
              type,
              mileage,
              accessories,
            }) => (
              <li className={css.carsListItem} key={id}>
                <CarsListItem
                  id={id}
                  img={img}
                  make={make}
                  model={model}
                  year={year}
                  rentalPrice={rentalPrice}
                  address={address}
                  rentalCompany={rentalCompany}
                  type={type}
                  mileage={mileage}
                  accessories={accessories}
                />
              </li>
            )
          )}
      </ul>
      {items.length > 8 && (
        <button className={css.LoadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
}

export default CarsList;