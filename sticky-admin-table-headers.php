<?php
/*
Plugin Name: Live Filter Admin WP List Tables
Plugin URI: http://github.com/bryanwillis/sticky-admin-table-headers
Description: Sticks the Table Headers on the Admin Edit Screens
Version: 1.0.0
Author: Bryan Willis
Author URI: http://profiles.wordpress.org/codecandid
License: GPLv2 or later
*/
if (!defined('WPINC')) {
	die;
}


if (!function_exists('jquery_live_filter_wp_list_tables')) {
	function jquery_live_filter_wp_list_tables()
	{
		if (!is_admin()) return;
		$screen = get_current_screen();
		$base = $screen->base;
		$type = $screen->post_type;
		$name = $screen->id;
		if (is_object($screen) && ($base === 'edit' || $name == 'plugins')) {
			wp_enqueue_script('jquery-live-filter-wp-list-tables', plugin_dir_url(__FILE__) . 'jquery.live-filter-wp-list-tables.js', array(
				'jquery'
			) , '1.0.0', true);
			wp_enqueue_script('jquery-live-filter-wp-list-tables-init', plugin_dir_url(__FILE__) . 'jquery.live-filter-wp-list-tables-init.js', array(
				'jquery-live-filter-wp-list-tables'
			) , '1.0.0', true);
		}
	}

	add_action('admin_enqueue_scripts', 'jquery_live_filter_wp_list_tables', 20);
}



if (!function_exists('jquery_wp_list_tables_filter_css_styles')) {
	function jquery_wp_list_tables_filter_css_styles()
	{
		if (!is_admin()) return;
		$screen = get_current_screen();
		$base = $screen->base;
		$name = $screen->id;
		if (is_object($screen) && ($base == 'edit' || $name == 'plugins')) {
		?>
			<style type="text/css">
				.filter-table .quick { margin-left: 0.5em; font-size: 0.8em; text-decoration: none; }
				.fitler-table .quick:hover { text-decoration: underline; }
				td.alt { background-color: rgba(255, 255, 0, 0.2); }
			</style>
		<?php
		}
	}

	add_action('admin_head', 'jquery_wp_list_tables_filter_css_styles');
}
