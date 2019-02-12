=== Ben's Slider for Gutenberg ===
Contributors: benrgreene
Tags: Gutenberg, slider
Stable tag: 1.1.0
Tested up to: 5.0
License: GPLv2 or later

Adds sliders to the Gutenberg editor.

== Description ==

This is a plugin that adds sliders to the Gutenberg editor! It introduces two new blocks:

1. Gutenberg slider container
2. Gutenberg slider block

Gutenberg Slider Container

This is the wrapper for the slider. All blocks that are direct descendents of this wrapper block will be the slides. All block types are supported.

There are a couple settings for the Slider Container block:

1. Arrows: this is to set whether or not the slider has navigation arrows.
2. Dots: Whether or not the slider has navigation dots.
3. Timer: Setting a value will add a timer for the slider to auto navigtate between slides. A value of "0" means there is no timer.

Gutenberg Slider Block

A special block that is designed to be used in the slider container. This contains a media selector, which you can use to select a background for the slider. There is also a section for adding child blocks, which will be the slider content displayed over the background. 

All options for child blocks (such as text settings) are honored. So you can still set color, font size, etc for your content to create rich content.

This block can only be added to the Slider Container block, it will not be available anywhere else. 

== Screenshots ==

1. Slider in the wild

== Changelog ==

= 1.1 =
* Moved the slider options to the block settings panel in the sidebar