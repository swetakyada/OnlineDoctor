import styled from 'styled-components';

export const HeroContainer = styled.div`
    background : #eff0eb;
    display :flex;
    
    justify-content:center;
    aligin-items:center;
    height:fit;
    padding : 0 30px;
    position:relative;
    z-index:1;
    background-repeat: repeat-y;
`;

export const LeftContainer = styled.div`

   
    border-right: 5px solid white;
    position:relative;
    width:50%;
    height:100%;
    -o-object-fit:cover;
    obeject-fit:cover;
    background:#f4f5f2;
    padding:10px;
   
`;
export const RightContainer = styled.div`
   
    width:24%;
    height:100%;
    -o-object-fit:cover;
    obeject-fit:cover;
    background:#f4f5f2;
    
`;

export const DoctorCards = styled.div`
    background:#f4f5f2;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    
`;



