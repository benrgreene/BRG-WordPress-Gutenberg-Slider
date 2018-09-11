const { registerBlockType} = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType(
  'brg/gutenberg-slider-container',
  {
    title: 'Gutenberg Slider Container',
    description: 'Container for the Gutenberg slider blocks',
    category: 'layout',
    edit() {
      // what we display in the editor
      return (
        <div>
          <InnerBlocks allowedBlock={['brg/gutenberg-slider-block']} />
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