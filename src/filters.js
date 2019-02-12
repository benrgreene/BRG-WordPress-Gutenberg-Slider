const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

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
              <div><label for="have-arrows">Use Slider Arrows?</label></div>
              <div><select onChange={ (event) => {
                props.setAttributes({'data-arrows': event.target.value })
              } } id="have-arrows" value={ props.attributes['data-arrows'] }>
                <option value="true">Use Slider Arrows</option>
                <option value="false" >Don't Include Slider Arrows</option>
              </select></div>
              <br/>
              <div><label for="have-dots">Use Slider Dots?</label></div>
              <div><select onChange={ (event) => {
                props.setAttributes({'data-dots': event.target.value })
              } } id="have-dots" value={ props.attributes['data-dots'] }>
                <option value="true">Use Slider Dots</option>
                <option value="false">Don't Include Slider Dots</option>
              </select></div>
              <br/>
              <div>Slide Timer (seconds)</div>
              <div><input type="number"
                onChange={ (event) => {
                  props.setAttributes({'data-timer': event.target.value })
                } }
                min="0"
                value={ props.attributes['data-timer'] }/>
              </div>
              <div>(Leave empty for no timer)</div>
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

    // set the blocktype info for our new attribute
    blockType.attributes['data-arrows'] = {
      type: 'string',
      default: ''
    }
    blockType.attributes['data-dots'] = {
      type: 'string',
      default: ''
    }
    blockType.attributes['data-timer'] = {
      type: 'string',
      default: ''
    }

    let arrowsVal = blockElement.getAttribute('data-arrows')
    let dotsVal   = blockElement.getAttribute('data-dots')
    let timerVal  = blockElement.getAttribute('data-timer')

    // set that container type
    if (arrowsVal) {
      block['data-arrows'] = arrowsVal
    }
    if (dotsVal) {
      block['data-dots']   = dotsVal
    }
    if (timerVal) {
      block['data-timer']  = timerVal
    }
  }
  return block
}
wp.hooks.addFilter('blocks.getBlockAttributes', 'brg-guten-slider/validate-container-attributes', setContainerValidation);

/**
 *  Need to set the new attribute value to save
 */
function setContainerAttribute (el, block, atts) {
  if (block.name == 'brg/gutenberg-slider-container') {
    if (atts['data-arrows']) {
      el.props['data-arrows'] = atts['data-arrows'] || 'true'  
    }
    if (atts['data-dots']) {
      el.props['data-dots']   = atts['data-dots'] || 'true'
    }
    if (atts['data-timer']) {
      el.props['data-timer']  = atts['data-timer'] || ''
    }
  }
  return el
}
wp.hooks.addFilter('blocks.getSaveElement', 'brg-guten-sliders/save-container-attributes', setContainerAttribute);