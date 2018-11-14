/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals console, window, document */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import CKFinder from '../../src/ckfinder';
import ArticlePluginSet from '@ckeditor/ckeditor5-core/tests/_utils/articlepluginset';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';

import { CS_CONFIG } from '@ckeditor/ckeditor5-cloud-services/tests/_utils/cloud-services-config';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		cloudServices: CS_CONFIG,
		plugins: [ ArticlePluginSet, ImageUpload, CKFinder ],
		toolbar: [ 'heading', '|', 'undo', 'redo', 'ckfinder' ],
		image: {
			toolbar: [ 'imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative' ]
		}
	} )
	.then( editor => {
		window.editor = editor;

		const button = document.querySelector( '#opener-method' );
		const label = document.querySelector( '#opener-method-label' );

		button.addEventListener( 'click', () => {
			const method = editor.config.get( 'ckfinder.openerMethod' );
			const isPopup = method === 'popup';

			const newMethod = isPopup ? 'modal' : 'popup';
			editor.config.set( 'ckfinder.openerMethod', newMethod );

			button.innerText = 'Switch to ' + ( isPopup ? 'popup' : 'modal' );
			label.innerText = newMethod;
		} );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
