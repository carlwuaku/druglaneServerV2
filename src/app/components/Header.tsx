import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

const Header = () => {
  const [title, setTitle] = useState("...");
  useEffect(() => {
    ipcRenderer.send("getAppDetails");
    ipcRenderer.on("appDetailsSent", (event: any, data: any) => {
      setTitle(data.title)
    })
  },
    []);
  
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home'
    },
    {
      label: 'System',
      icon: 'pi pi-fw pi-desktop',
      items: [
        {
          label: 'Restart System',
          icon: 'pi pi-fw pi-refresh'
        },
        {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off'
        },
      ]
    },
    {
      label: 'Backups',
      icon: 'pi pi-fw pi-database',
      items: [
        {
          label: 'Create Backup Now',
          icon: 'pi pi-fw pi-cloud-download'
        },
        {
          label: 'View/Restore Backups',
          icon: 'pi pi-fw pi-cloud-upload'
        }

      ]
    },
    {
      label: 'Users & Permissions',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New User',
          icon: 'pi pi-fw pi-user-plus',

        },
        {
          label: 'Manage Users',
          icon: 'pi pi-fw pi-users',

        },
        {
          label: 'New Role',
          icon: 'pi pi-fw pi-users',
        },
        {
          label: 'Manage User Permissions',
          icon: 'pi pi-fw pi-users',
        }
      ]
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog'
    },
    {
      label: 'Help',
      icon: 'pi pi-fw pi-power-off'
    }
  ];

  const logo = <label htmlFor=""> {title}</label>
  const search = <InputText placeholder="Search" type="text" className="w-full" />;

  return (
    // <Navbar className='navbar'>
    //   <Container>
    //     <NavbarBrand className='whiteText'>
    //       {title}
    //     </NavbarBrand>
    //   </Container>
    // </Navbar>

    <div className="card">
      <Menubar start={logo} model={items} end={search} />
    </div>
  )
}

export default Header

