import React from "react";

const GridIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x={11} y={11} width={7} height={7} rx={2} stroke={color} strokeWidth={2} strokeLinejoin="round"/>
    <rect x={11} y={1} width={7} height={7} rx={2} stroke={color} strokeWidth={2} strokeLinejoin="round"/>
    <rect x={1} y={11} width={7} height={7} rx={2} stroke={color} strokeWidth={2} strokeLinejoin="round"/>
    <rect x={1} y={1} width={7} height={7} rx={2} stroke={color} strokeWidth={2} strokeLinejoin="round"/>
  </svg>
);

const ListIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="1" y="1" width="4" height="4" rx="2" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <rect x="1" y="15" width="4" height="4" rx="2" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <rect x="1" y="8" width="4" height="4" rx="2" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M18 3H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 10H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 17H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HistoryIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H9H8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CartIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1 10V8.5C1 6.84315 2.34315 5.5 4 5.5H16.5429M12.4286 1L17 5.5L12.4286 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusCircleIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M12 8V16M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MinusIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PlusIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SearchIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="9" cy="9" r="7" stroke={color} strokeWidth="2"/>
    <path d="M14 14L19 19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FilterIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HamburgerIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 12H21M3 6H21M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowLeftIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19 12H5M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 6H5H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = ({ size = 12, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="6" cy="6" r="5.5" stroke={color}/>
    <path d="M5.07469 2.5H6.93469L6.62469 7.07H5.38469L5.07469 2.5ZM6.00469 9.58C5.73135 9.58 5.50135 9.49333 5.31469 9.32C5.13469 9.14 5.04469 8.92333 5.04469 8.67C5.04469 8.41667 5.13469 8.20667 5.31469 8.04C5.49469 7.86667 5.72469 7.78 6.00469 7.78C6.28469 7.78 6.51469 7.86667 6.69469 8.04C6.87469 8.20667 6.96469 8.41667 6.96469 8.67C6.96469 8.92333 6.87135 9.14 6.68469 9.32C6.50469 9.49333 6.27802 9.58 6.00469 9.58Z" fill={color}/>
  </svg>
);

export {
  GridIcon,
  ListIcon,
  HistoryIcon,
  BellIcon,
  CartIcon,
  CloseIcon,
  ArrowIcon,
  PlusCircleIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  HamburgerIcon,
  ArrowLeftIcon,
  TrashIcon,
  EditIcon,
  InfoIcon,
};
