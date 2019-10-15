import browserSync from 'browser-sync';
import del from 'del';
import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import less from 'gulp-less';

const paths = {
	styles: {
		src: ['./templates/padraogoverno01/less/*.less', '!./templates/padraogoverno01/less/_*.less'],
		dest: './templates/padraogoverno01/css/'
	}
};

const appName = 'joomlagov';

const reload = done => {
	browserSync.reload();
	done();
};

const serve = done => {
	browserSync.init({
		proxy: `http://localhost/${appName}`,
		open: false
	});

	done();
};

/**
 * Limpa a pasta de destino dos css
 */
export const clean = () => del([paths.styles.dest, '!./templates/padraogoverno01/css/custom.css']);

/**
 * Processa os arquivos LESS e comprime o CSS
 */
export const styles = () => {
	return gulp
		.src(paths.styles.src)
		.pipe(less())
		.pipe(cleanCSS({ compatibility: 'ie7' }))
		.pipe(gulp.dest(paths.styles.dest));
};

/**
 * Monitora e processa os arquivos LESS quando alterados sem comprimir.
 * Usado para desenvolvimento
 */
const watchFiles = () => {
	gulp.watch(paths.styles.src, gulp.series(styles, reload));
};

export const dev = gulp.series(clean, styles, serve, watchFiles);
export default dev;
