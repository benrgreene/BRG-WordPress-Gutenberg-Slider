const { registerBlockType} = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType(
  'brg/gutenberg-slider-container',
  {
    title: 'Gutenberg Slider Container',
    description: 'Container for the Gutenberg slider blocks',
    category: 'layout',
    icon: 'images-alt2',
    edit() {
      // what we display in the editor
      return (
        <div className="editor-slider-container">
          <InnerBlocks />
        </div>
      );
    },
    save() {
      return (
        <div className="gutenberg__slider">
          <InnerBlocks.Content />
        </div>
      );
    }
  }
);