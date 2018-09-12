const { registerBlockType} = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType(
  'brg/gutenberg-slider-container',
  {
    title: 'Slider Container',
    description: 'Container for the Gutenberg slider blocks',
    category: 'layout',
    icon: 'images-alt2',
    attributes: {
      timer: {
        selector: '.guttenberg__slider',
        attribute: 'data-timer'
      },
      hasArrows: {
        selector: '.guttenberg__slider',
        attribute: 'data-arrows'
      },
      hasDots: {
        selector: '.guttenberg__slider',
        attribute: 'data-dots'
      }
    },
    edit({attributes, className, setAttributes}) {
      function setArrows( event ) {
        event.preventDefault();
        let haveArrows = event.target.querySelector('option:checked');
        setAttributes({ hasArrows: haveArrows.value });
      }
      function setDots( event ) {
        event.preventDefault();
        let haveDots = event.target.querySelector('option:checked');
        setAttributes({ hasDots: haveDots.value }); 
      }
      function setTimer( event ) {
        event.preventDefault();
        let time = event.target.value;
        setAttributes({ timer: time });
      }
      // what we display in the editor
      return (
        <div className="editor-slider-container">
          <table>
            <tr>
              <td><label for="have-arrows">Use Slider Arrows?</label></td>
              <td><select onChange={ setArrows } id="have-arrows" value={ attributes.hasArrows }>
                <option value="true">Use Slider Arrows</option>
                <option value="false" >Don't Include Slider Arrows</option>
              </select></td>
            </tr>
            <tr>
              <td><label for="have-dots">Use Slider Dots?</label></td>
              <td><select onChange = { setDots } id="have-dots" value={ attributes.hasDots }>
                <option value="true">Use Slider Dots</option>
                <option value="false">Don't Include Slider Dots</option>
              </select></td>
            </tr>
            <tr>
              <td>Slide Timer (seconds)</td>
              <td><input onChange = { setTimer } value={ attributes.timer }/></td>
              <td>(Leave empty for no timer)</td>
            </tr>
          </table>
          <InnerBlocks />
        </div>
      );
    },
    save({attributes}) {
      return (
        <div className="gutenberg__slider" 
          data-arrows={attributes.hasArrows} 
          data-dots={attributes.hasDots}
          data-timer={attributes.timer}>
          <InnerBlocks.Content />
        </div>
      );
    }
  }
);