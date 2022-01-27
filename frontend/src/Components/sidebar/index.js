import React from 'react'
import { SidebarContainer, Icon,CloseIcon,SidebarLink,SidebarRoute,SidebarWrapper,SidebarMenu,SideBtnWrap} from './sidebarElements'
const Sidebar = ({isOpen,toggle}) => {
    return (
       <SidebarContainer isOpen={isOpen} onClick={toggle}>
           <Icon onClick={toggle}>
             <CloseIcon/>  
           </Icon>
           <SidebarWrapper>
               <SidebarMenu>
                   <SidebarLink to="about">
                       About
                   </SidebarLink>
               </SidebarMenu>
           </SidebarWrapper>
           <SideBtnWrap>
               <SidebarRoute to="/signin">Sign In</SidebarRoute>
           </SideBtnWrap>
       </SidebarContainer>
    );
};

export default Sidebar
