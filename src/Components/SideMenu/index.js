// @flow strict

import * as React from 'react';
import './sideMenu.css'

// type Props = {||};

class SideMenu extends React.Component {
    render() {
        let MenuItems1 = [
            { title: 'Dashboard' },
            { title: 'Bidding' },
            { title: 'My Projects' },
            { title: 'Log out' }

        ]
        let MenuItems2 = [
            { title: 'Dashboard' },
            { title: 'Pending Leave Requests' },
            { title: 'Approved Leaves' },
            { title: 'Log out' }
        ]

        let menu = this.props.previlige === 'ADMIN' ? MenuItems2 : MenuItems1
        console.log('Sidemenu > props > ', this.props,)
        return (
            <div className='menu' style={{ height: '100vh', position: 'sticky', top: 0 }}>
                {
                    menu.map((item, index) =>
                        <span key={index} onClick={() => this.props.selectMenuItem(item)}
                            className={this.props.activeItem === item.title ? 'activeMenuItem' : 'menuItem'}
                        >
                            {item.title}
                        </span>)
                }
            </div>

        );
    }
}

export default SideMenu;