const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, ColorPalette } = wp.components;

/**
 *  Add the custom block control 
 */
const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    if (props.name == 'brg/gutenberg-slider-container') {
      return (
        <Fragment>
          <BlockEdit { ...props } />
          <InspectorControls>
            <PanelBody>
              <div>
                <div>Slide Timer (seconds)</div>
                <div><input type="number"
                  onChange={ (event) => {
                    props.setAttributes({'data-timer': event.target.value })
                  } }
                  min="0"
                  value={ props.attributes['data-timer'] }/>
                </div>
                <div>(Leave empty for no timer)</div>
              </div><hr/>
              <div>
                <div><label for="have-arrows">Use Slider Arrows?</label></div>
                <div><select onChange={ (event) => {
                  props.setAttributes({'data-arrows': event.target.value })
                } } id="have-arrows" value={ props.attributes['data-arrows'] }>
                  <option value="true">Use Slider Arrows</option>
                  <option value="false" >Don't Include Slider Arrows</option>
                </select></div>
              </div>
              <br/>
              {props.attributes['data-arrows'] != 'false' &&
                <div>
                  <div>
                    <label>Left Arrow Content</label>
                    <div>
                      <input type="text"
                        onChange={ (event) => {
                          props.setAttributes({'data-left-arrow-content': event.target.value })
                        } }
                        value={ props.attributes['data-left-arrow-content'] }/>
                    </div>
                    <div>(Leave blank for default arrow)</div>
                  </div>
                  <br/>
                  <div>
                    <label>Right Arrow Content</label>
                    <div>
                      <input type="text"
                        onChange={ (event) => {
                          props.setAttributes({'data-right-arrow-content': event.target.value })
                        } }
                        value={ props.attributes['data-right-arrow-content'] }/>
                    </div>
                    <div>(Leave blank for default arrow)</div>
                  </div>
                </div>
              }
              <hr/>
              <div><label for="have-dots">Use Slider Dots?</label></div>
              <div><select onChange={ (event) => {
                props.setAttributes({'data-dots': event.target.value })
              } } id="have-dots" value={ props.attributes['data-dots'] }>
                <option value="true">Use Slider Dots</option>
                <option value="false">Don't Include Slider Dots</option>
              </select></div>
              <br/>
              {props.attributes['data-dots'] != 'false' &&
                <div>
                  <div><label for="dot-color">Dot Color:</label></div>
                  <div>
                    <ColorPalette 
                        colors={[
                          {'name': 'Default Blue', 'color': '#1188FF'},
                          {'name': 'Red', 'color': '#FF4444'},
                          {'name': 'Green', 'color': '#44FF66'},
                          {'name': 'Black', 'color': '#000000'},
                          {'name': 'White', 'color': '#FFFFFF'}
                        ]}
                        value={props.attributes['data-dot-color'] || "#1188FF"}
                        onChange={( color ) => props.setAttributes({'data-dot-color': color })} 
                    />
                  </div>
                </div>
              }
            </PanelBody>
          </InspectorControls>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <BlockEdit { ...props } />
        </Fragment>
      )
    }
  }
}, "withInspectorControl" )
wp.hooks.addFilter('editor.BlockEdit', 'brg-guten-slider/with-inspector-controls', withInspectorControls);

/**
 *  Need to set the container attribute for validation of the block
 */
function setContainerValidation (block, blockType, innerHTML) {
  if (blockType.name == 'brg/gutenberg-slider-container') {
    let dummyEl = document.createElement('div')
    dummyEl.innerHTML   = innerHTML
    let blockElement    = dummyEl.firstChild

    const blockTypeAttributes = [
      { 'name': 'data-arrows', 'type': 'string' }, 
      { 'name': 'data-dots', 'type': 'string' }, 
      { 'name': 'data-timer', 'type': 'string' }, 
      { 'name': 'data-dot-color', 'type': 'string' },
      { 'name': 'data-left-arrow-content', 'type': 'string' },
      { 'name': 'data-right-arrow-content', 'type': 'string' }
    ]

    // loop through the attributes and perform individual setup for each
    blockTypeAttributes.forEach((blockAttribute) => {
      // Add setting type to the validation settings
      blockType.attributes[blockAttribute.name] = {
        type: blockAttribute.type,
        default: ''
      }
      // If there is a value for the setting, add it to the block settings
      let existingAttributeValue = blockElement.getAttribute(blockAttribute.name)
      if (existingAttributeValue) {
        block[blockAttribute.name] = existingAttributeValue
      }
    })
  }
  return block
}
wp.hooks.addFilter('blocks.getBlockAttributes', 'brg-guten-slider/validate-container-attributes', setContainerValidation);

/**
 *  Need to set the new attribute value to save
 */
function setContainerAttribute (el, block, atts) {
  if (block.name == 'brg/gutenberg-slider-container') {
    const attributeTypes = [
      { 'name': 'data-arrows', 'default': 'true' },
      { 'name': 'data-dots', 'default': 'true' },
      { 'name': 'data-timer', 'default': '' },
      { 'name': 'data-dot-color', 'default': '#1188FF' },
      { 'name': 'data-left-arrow-content', 'default': '' },
      { 'name': 'data-right-arrow-content', 'default': '' }
    ]

    // Ensure that if attribute exists, it's set/saved
    attributeTypes.forEach((attributeType) => {
      if (atts[attributeType.name]) {
        el.props[attributeType.name] = atts[attributeType.name] || attributeType.default
      }  
    })
  }
  return el
}
wp.hooks.addFilter('blocks.getSaveElement', 'brg-guten-sliders/save-container-attributes', setContainerAttribute);