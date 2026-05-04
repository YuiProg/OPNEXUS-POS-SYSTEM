import React from 'react';
import './TRPanelPage.css';
import DropDown from '../TRDropDown/Dropdown';

export class RightPanel extends React.Component {
  render() {
    return (
      <div className='tr-panel-right-side'>
        {this.props.children}
      </div>
    );
  }
}

export class PanelPage extends React.Component {
  passPropsToChildren = () => {
    const { hasTableFilters, onFilterToggle } = this.props;

    return React.Children.map(this.props.children, (child) => {
      if (!child) return null;
      // Don't pass table props to the RightPanel (filters)
      if (child.type === RightPanel) return child;
      return React.cloneElement(child, { hasTableFilters, onFilterToggle });
    });
  };

  render() {
    const {
      titlePage,
      subTitle,
      selectedBranch,
      dropDownFunc,
      branchNames,
      user,
      hasBranch,
      hasTableFilters,
      filtersOpen,
    } = this.props;

    const childrenArray = React.Children.toArray(this.props.children);
    
    // Find the RightPanel in children
    const rightPanel = childrenArray.find((child) => child.type === RightPanel);

    // Everything else goes in the Main area
    const mainChildren = React.Children.toArray(this.passPropsToChildren()).filter(
      (child) => child.type !== RightPanel
    );

    return (
      <div className="tr-panel-container">
        <div className="tr-panel-top-contents">
          <div className="tr-panel-header">
            <h1 className="tr-panel-bigtitle">{titlePage}</h1>
            <p className="tr-panel-sentence">{subTitle}</p>
          </div>
          
          <div className="tr-panel-top-right">
            {hasBranch && user && (
              <div className="iv-branch-dropdown">
                {user.role !== 'Clerk' && (
                  <div>
                    <p className="iv-branch-text">Branch</p>
                    <DropDown
                      isHeader
                      className="iv-branch-dd"
                      defaultValue={selectedBranch || 'Branch'}
                      onChange={(e) => dropDownFunc(e)}
                      options={branchNames}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="tr-panel-body">
          <div className="tr-panel-main">
            {mainChildren}
          </div>

          {/* This is now a sidebar on the right */}
          {filtersOpen && hasTableFilters && rightPanel && (
            <div className="tr-panel-right-wrapper">
              {rightPanel}
            </div>
          )}
        </div>
      </div>
    );
  }
}