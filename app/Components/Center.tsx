'use client'

import { useState,useEffect } from 'react';
import styles from './Center.module.css';
import Leftsection from './Leftsections';
import Image from 'next/image';
import { worldLoader, CountryData } from '../routes/world';

export default function Center() {
  const [countryName, setCountryName] = useState('');
  const [leftOn, setLeftOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  
  const loader = async (name:string) => {
    if (!countryName) return;
    setLoading(true);
    try {
      const data = await worldLoader(name);
      setCountryData(data);
    } catch (err) {
      console.error('API error:', err);
      setCountryData(null);
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
      if(countryName){
        loader(countryName)
      }
  },[countryName]);
  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.leftsection}>
        <Leftsection
          setContry={setCountryName}
          setLefton={setLeftOn}
          lefton={leftOn}
          
        />
      </div>

      {/* Center Section */}
      <div className={styles.centersection}>
        {/* Flag */}
        <div className={styles.flagbox}>
          {countryData?.flag ? (
            <Image
              src={countryData.flag}
              alt={`${countryData.name} flag`}
              width={200}
              height={150}
              className={styles.flag}
            />
          ) : (
            <div className={styles.flagPlaceholder}>No Flag</div>
          )}
        </div>

        {/* Info Box */}
        <div className={styles.infobox}>
          {loading && <p>Loading...</p>}
          {countryData && !loading && (
            <>
              <strong><p>Name:</p>{countryData.name}</strong>
              <strong><p>Capital:</p>{countryData.capital.join(', ')}</strong>
              <strong><p>Region:</p>{countryData.region}</strong>
              <strong><p>Population:</p>{countryData.population.toLocaleString()}</strong>
              <strong><p>Languages:</p>{countryData.languages.join(', ')}</strong>
              <strong><p>Currency Name:</p>{countryData.currencyNames.join(', ')}</strong>
              <strong><p>Time zone:</p>{countryData.timezones.join(', ')}</strong>
              <button
                onClick={() => countryData.map && window.open(countryData.map, '_blank')}
                className={styles.explorebutton}
              >
                Explore!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
