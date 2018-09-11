import './styles/block-editor.css';

const { registerBlockType} = wp.blocks;
const { InnerBlocks, RichText, MediaUpload } = wp.editor;
const { Button } = wp.components;

const sliderAllowedBlocks = ['core/paragraph']

registerBlockType(
  'brg/gutenberg-slider-block',
  {
    title: 'Gutenberg Slider Block',
    description: 'Container for the Gutenberg slider blocks',
    parent: ['brg/gutenberg-slider-container'],
    category: 'layout',
    attributes: {
      background: {
        attribute: 'src',
        selector: '.guttenberg-slide'
      }
    },
    edit({attributes, className, setAttributes}) { 
      const getImageButton = (openEvent) => {
        if(attributes.background) {
          return (
            <img 
              src = {attributes.background}
              onClick = {openEvent}
              className = "editor-slide-background"
            />
          );
        } else {
          return (
            <div className="button-container">
              <Button 
                onClick={ openEvent }
                className="button button-large"
              >
                Pick an image
              </Button>
            </div>
          );
        }
      };
      return (
        <div className="guttenberg-slide--editor">
          <MediaUpload
            onSelect = { media => { 
              setAttributes({background: media.url });
            }}
            type = "image"
            value = { attributes.background }
            render = { ({ open }) => getImageButton(open) }
          />
          <div className="editor-slide-content">
            <InnerBlocks
              allowedBlocks={sliderAllowedBlocks}
            />
          </div>
        </div>
      );
    },
    save({attributes}) {
      return (
        <div className="guttenberg-slide" style={`background-image: url('${attributes.background}');`}>
          <div className="guttenberg-slide__content">
            <InnerBlocks.Content />
          </div>
        </div>
      );
    }
  }
);