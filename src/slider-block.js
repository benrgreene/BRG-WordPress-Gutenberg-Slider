const { registerBlockType} = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType(
  'brg/gutenberg-slider-block',
  {
    title: 'Gutenberg Slider Block',
    description: 'Container for the Gutenberg slider blocks',
    parent: 'brg/gutenberg-slider-container',
    category: 'layout',
    edit() { 
      return (
        <div className="slide">
          <InnerBlocks />
        </div>
      );
    },
    save() {
      return (
        <div>
          <InnerBlocks.Content />
        </div>
      );
    }
  }
);