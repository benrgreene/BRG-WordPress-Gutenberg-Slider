<?php

/*
  Plugin Name: Ben's Slider for Gutenberg
  Description: Adds a slider block to the Gutenberg Editor
  Version: 1.2.0
  Author: Ben Greene
  Author URI: www.benrgreene.com
  License: GPLv2
*/

// add the backend editor script
add_action( 'enqueue_block_editor_assets', 'brg_gb_slider_register_assets' );
function brg_gb_slider_register_assets() {
  $file_version = brg_get_file_verison( 'index.build.js' );
  // Add the slider container script
  wp_enqueue_script(
    'brg-gutenberg-slider-block',
    plugins_url( 'build/index.build.js', __FILE__ ),
    array('wp-blocks', 'wp-element', 'wp-editor'),
    $file_version
  );
}

// Add our front end scripts
add_action( 'init', 'brg_add_frontend_slider_scripts' );
function brg_add_frontend_slider_scripts() {
  if( is_admin() ) {
    return;
  }

  $file_version = brg_get_file_verison( 'app.build.js' );
  wp_enqueue_script(
    'brg-gutenberg-slider-block-frontend',
    plugins_url( 'build/app.build.js', __FILE__ ),
    array(),
    $file_version
  );
}

// Get tile a file was edited (used for versioning/cache-busting)
function brg_get_file_verison( $file ) {
  $file_name    = plugin_dir_path( __FILE__ ) . 'build/' . $file;
  $file_version = false;
  if( file_exists($file_name) ) {
    $file_version = filemtime( $file_name );
  }
  return $file_version;
}