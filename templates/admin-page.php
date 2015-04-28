<?php defined( 'WPINC' ) or die; ?>
<style>
#gifdrop-path {
	text-transform: lowercase;
}
</style>
<div class="wrap">
	<h2><?php echo esc_html( $GLOBALS['title'] ); ?></h2>

	<form method="post" action="<?php echo admin_url( 'admin-post.php' ); ?>" class="gifdrop-postbox">
		<input type="hidden" name="action" value="gifdrop-save" />
		<?php wp_nonce_field( self::NONCE ); ?>
		<table class="form-table">
			<tr valign="top">
				<th scope="row"><label for="gifdrop-name"><?php _e( 'GifDrop Name', 'gifdrop' ); ?></label></th>
				<td class="gifdrop-select-pages-section">
					<input type="text" id="gifdrop-name" name="gifdrop_name" value="<?php echo esc_attr( $this->get_option( 'name' ) ); ?>" class="regular-text" />
					<p class="description"><?php _e( 'The site display name. Defaults to "GifDrop".', 'gifdrop' ); ?></p>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row"><label for="gifdrop-path"><?php _e( 'GifDrop Location', 'gifdrop' ); ?></label></th>
				<td class="gifdrop-select-path-section">
					<?php echo home_url( '/' ); ?><input type="text" id="gifdrop-path" name="gifdrop_path" value="<?php echo esc_attr( $this->get_option( 'path' ) ); ?>" />
					<p class="description"><?php _e( 'The URL on your site where you want your gif collection to be available.', 'gifdrop' ); ?></p>
					<p class="description"><?php _e( '(If this is blank, the front of your site will be your gif collection!)', 'gifdrop' ); ?></p>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row"><label for="gifdrop-shorturls"><?php _e( 'Short URLs', 'gifdrop' ); ?></label></th>
				<td class="gifdrop-use-short-urls-section">
					<input type="checkbox" id="gifdrop-shorturls" name="gifdrop_shorturls" value="1" <?php checked( $this->get_option( 'shorturls', 1 ) ); ?> />
					<span class="description"><?php echo sprintf( __( 'If enabled, image URLs will be shortened (e.g. %s).', 'gifdrop' ), home_url( base_convert( absint( get_option( 'gifdrop_filename_count' ) ), 10, 36 ) . '.gif' ) ); ?></span>
				</td>
			</tr>
		</table>
		<?php submit_button( __('Save Changes', 'gifdrop' ), 'primary', 'submit', true ); ?>
	</form>
</div>
