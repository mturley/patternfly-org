import React from 'react';
import { Button, Bullseye, GalleryItem, Popover } from '@patternfly/react-core';
import { global_FontSize_sm as labelFontSize } from '@patternfly/react-tokens';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import posed from 'react-pose';
import copy from 'clipboard-copy';
import { saveAs } from 'file-saver';
import ReactDOM from 'react-dom';

const styles = {
  iconCell: css`
    padding-top: 32px;
    padding-right: 16px;
    padding-bottom: 32px;
    padding-left: 16px;
    // box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.12), 0 6px 20px 2px rgba(0, 0, 0, 0.12);
    background-color: rgba(190, 225, 244, 0.5);
    cursor: pointer;
    &:hover {
      background-color: rgba(190, 225, 244, 0.75);
    }
  `,
  textbox: css`
    text-align: center;
    margin: 3px;
    padding-top: 16px;
    overflow: hidden;
  `,
  label: css`
    font-size: 18px;
    word-break: break-all;
  `,
  innerItem: css`
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      > * {
        width: 32px;
        height: 32px;
      }
    }
  `,
  labelHovered: css`
    font-size: ${labelFontSize.var};
    word-break: break-all;
    transform: scale(0.7);
  `,
  popover: css`
    width: 500px;
    .pf-c-popover {
      width: 100%;
    }
  `,
  popoverHeader: css`
    margin-right: 10px;
  `,
  popoverBody: css`
    display: flex;
    width: 800px;
    flex-direction: column;
    align-items: left;
  `,
  textDescription: css`
    margin-bottom: 16px;
  `,
  copyButtons: css`
    display: flex;
    margin-left: -16px;
  `,
  scaleDown: css`transform: scale(.7);`,
  openContainer: css`display: flex;`,
  leftContainer: css`
    width: 100px;
    display: flex;
    flex-direction: column;
    color: white;
    padding: 15px 0 0 10px;
    align-items: center;
  `,
  rightContainer: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    transform: scale(0.85);
  `,
  hoveredColor: css`color: white;`
};

const Box = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 1.3 }
});

class IconCard extends React.Component {
  constructor(props) {
    super(props);
    this.iconRef = React.createRef();
  }

  onCopyReact = event => {
    event.stopPropagation();
    const { id } = this.props;
    copy(`import { ${id} } from '@patternfly/react-icons'`);
  };

  onCopyHtml = event => {
    event.stopPropagation();
    const { name } = this.props;
    copy(`<i className="pf-icon pf-icon-${name}"></i>`);
  };

  onDownloadSvg = () => {
    const { name } = this.props;
    const domNode = ReactDOM.findDOMNode(this.iconRef.current);
    domNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    domNode.setAttribute("width", "100%");
    domNode.setAttribute("height", "100%");
    const { outerHTML } = domNode;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';

    const filename = `${name}.svg`;

    const blob = new Blob([preface, outerHTML], {
      type: 'image/svg+xml;charset=utf-8'
    });

    saveAs(blob, filename);
  };
  
  render() {
    const { icon: Icon, name } = this.props;
    const popoverBody = (
      <div css={styles.popoverBody}>
        <div css={styles.textDescription}>
          <div>Indicates that a user may create or add something.</div>
        </div>
        <div css={styles.copyButtons}>
          <Box><Button variant="link" onClick={this.onDownloadSvg}>Download SVG</Button></Box>
          <Box><Button variant="link" onClick={this.onCopyHtml}>Copy HTML</Button></Box>
          <Box><Button variant="link" onClick={this.onCopyReact}>Copy React</Button></Box>
        </div>
      </div>
    );
    return (
      <GalleryItem>
        <Popover 
          css={styles.popover}
          position="right" 
          headerContent={<div css={styles.popoverHeader}>{name}</div>} 
          bodyContent={popoverBody}
        >
          <div css={styles.iconCell}>
            <div css={styles.iconbox}>
              <Bullseye>
                <div css={styles.innerItem}>
                  <Bullseye>
                    {typeof window !== 'undefined' && <Icon size="xl" ref={this.iconRef} />}
                  </Bullseye>
                </div>
              </Bullseye>
            </div>
            <div css={[styles.textbox, styles.label]}>
              {name}
            </div>
          </div>
        </Popover>
      </GalleryItem>
    );
  }

}

export default IconCard;
