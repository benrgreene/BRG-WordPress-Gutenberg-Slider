const { registerBlockType} = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType(
  'brg/gutenberg-slider-container',
  {
    title: 'Slider Container',
    description: 'Container for the Gutenberg slider blocks',
    category: 'layout',
    icon: 'images-alt2',
    edit({attributes, className, setAttributes}) {
      return (
        <div className="editor-slider-container">
          <InnerBlocks />
        </div>
      );
    },
    save({attributes}) {
      return (
        <div className="gutenberg__slider">
          <InnerBlocks.Content />
        </div>
      );
    },
    deprecated: [
      {
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
        save: function( props ) {
          return (
            <div className="gutenberg__slider" 
              data-arrows={props.attributes.hasArrows} 
              data-dots={props.attributes.hasDots}
              data-timer={props.attributes.timer}>
              <InnerBlocks.Content />
            </div>
          );
        },
      }
    ]
  }
);