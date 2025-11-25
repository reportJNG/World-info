'use client';


import React from 'react';
import styles from './Leftsection.module.css';

interface LeftSectionProps {
  setContry: (value: string) => void;
  setLefton: React.Dispatch<React.SetStateAction<boolean>>;
  lefton:boolean;  
}

export default function Leftsection({ setContry,setLefton,lefton }: LeftSectionProps) {
  

  const arrayOfCountry: string[] = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Argentina", "Armenia", "Australia", "Austria",
    "Belgium", "Brazil", "Canada", "China", "Denmark",
    "Egypt", "Finland", "France", "Germany", "Greece",
    "India", "Indonesia", "Iraq", "Ireland", 
    "Italy", "Japan", "Jordan", "Kenya", "Kuwait",
    "Lebanon", "Luxembourg", "Malaysia", "Mexico", "Morocco",
    "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman",
    "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Russia", "Saudi Arabia", "South Africa",
    "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland",
    "Taiwan", "Thailand", "Turkey", "UAE", "United Kingdom",
    "United States", "Vietnam"
  ];

  const handleCountryClick = (name: string) => {
    setContry(name);
    setLefton(false);
  };

  return (
    <aside className={styles.sidebar}>
      <div
        className={`${styles.toggleBtn} ${lefton ? styles.toggleOpen : ''}`}
        onClick={() => setLefton(prev => !prev)}
      >
        {!lefton ? (
          <i className="fi fi-br-menu-burger"></i>
        ) : (
          <i className="fi fi-br-cross"></i>
        )}
      </div>

      <div className={`${styles.dropdown} ${lefton ? styles.dropdownOpen : ''}`}>
        {arrayOfCountry.map((country) => (
          <button
            key={country}
            className={styles.countryBtn}
            onClick={() => handleCountryClick(country)}
          >
            {country}
          </button>
        ))}
      </div>
    </aside>
  );
}