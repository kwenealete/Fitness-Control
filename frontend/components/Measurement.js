import Link from 'next/link';
//import { Table } from 'reactstrap';
// import Table from './styles/Table';
import DeleteMeasurement from './DeleteMeasurement';
import styled from 'styled-components';

const ButtonList = styled.div`
    
    display: inline-flex;
    justify-content:space-around;
    width: 100%;
    border-top: 1px solid var(--lightGray);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: var(--lightGray);
    & > * {
      background: none;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
`;
    
    
export default function Measurement({ measurement }) {
    
    return (
       <div>
           
                    
                    
             {measurement.day} of {measurement.month} ({measurement.weight}kg)
                
                
                <ButtonList>
                    
                        <Link href={{
                            
                            pathname: '/update',
                            query: {
                                id: measurement.id
                            }
                        }}>Edit</Link>
                    
                    <DeleteMeasurement id={measurement.id}>Delete</DeleteMeasurement>
                </ButtonList>
            
        </div>
    )
        
                
                
    
} 
