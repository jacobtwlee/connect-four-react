import styled from 'styled-components'

export const Button = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  padding: 8px;
  margin: 12px 0;
  width: 100%;
  color: #4d6e7b;
  border-radius: 5px;
  outline: none;
  background: transparent;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #243239;
    background: #4d6e7b;
  }

  &:focus {
    border-color: #4d6e7b; 
  }
`
