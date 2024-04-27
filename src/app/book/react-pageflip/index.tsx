import React, {
	ReactElement,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

import { PageFlip } from '../page-flip';
import { IFlipSetting, IEventProps } from './settings';
import { WidgetEvent } from '../page-flip/Event/EventObject';

interface IProps extends IFlipSetting, IEventProps {
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
	renderOnlyPageLengthChange?: boolean;
}

const HTMLFlipBookForward = React.forwardRef(
	(props: IProps, ref: React.ForwardedRef<PageFlip>) => {
		const htmlElementRef = useRef<HTMLDivElement>(null);
		const childRef = useRef<HTMLElement[]>([]);
		const pageFlip = useRef<PageFlip>();

		const [pages, setPages] = useState<ReactElement[]>([]);

		const refreshOnPageDelete = useCallback(() => {
			if (pageFlip.current) {
				pageFlip.current.clear();
			}
		}, []);

		const removeHandlers = useCallback(() => {
			const flip = pageFlip.current;

			if (flip) {
				flip.off('flip');
				flip.off('changeOrientation');
				flip.off('changeState');
				flip.off('init');
				flip.off('update');
			}
		}, []);

		useEffect(() => {
			childRef.current = [];

			if (props.children) {
				const childList = React.Children.map(props.children, (child) => {
					return React.cloneElement(child as ReactElement, {
						ref: (dom: HTMLElement) => {
							if (dom) {
								childRef.current.push(dom);
							}
						},
					});
				});

				if (childList) {
					if (!props.renderOnlyPageLengthChange || pages.length !== childList.length) {
						if (childList.length < pages.length) {
							refreshOnPageDelete();
						}

						setPages(childList);
					}
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [props.children]);

		useEffect(() => {
			const setHandlers = () => {
				const flip = pageFlip.current;

				if (flip) {
					if (props.onFlip) {
						flip.on('flip', (e: WidgetEvent) => { if (props.onFlip) props.onFlip(e) });
					}

					if (props.onChangeOrientation) {
						flip.on('changeOrientation', (e: WidgetEvent) => { if (props.onChangeOrientation) props.onChangeOrientation(e) });
					}

					if (props.onChangeState) {
						flip.on('changeState', (e: WidgetEvent) => { if (props.onChangeState) props.onChangeState(e) });
					}

					if (props.onInit) {
						flip.on('init', (e: WidgetEvent) => { if (props.onInit) props.onInit(e) });
					}

					if (props.onZoom) {
						flip.on('zoom', (e: WidgetEvent) => { if (props.onZoom) props.onZoom(e) });
					}

					if (props.onUpdate) {
						flip.on('update', (e: WidgetEvent) => { if (props.onUpdate) props.onUpdate(e) });
					}
				}
			};

			if (pages.length > 0 && childRef.current.length > 0) {
				removeHandlers();

				if (htmlElementRef.current && !pageFlip.current) {
					pageFlip.current = new PageFlip(htmlElementRef.current, props);
				}

				if (!pageFlip.current?.getFlipController()) {
					pageFlip.current?.loadFromHTML(childRef.current);
				} else {
					pageFlip.current?.updateFromHtml(childRef.current);
				}

				setHandlers();
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [pages]);

		return (
			<div ref={htmlElementRef} className={props.className} style={props.style}>
				{pages}
			</div>
		);
	}
);
HTMLFlipBookForward.displayName = 'HTMLFlipBook';

export const HTMLFlipBook = React.memo(HTMLFlipBookForward);

export default HTMLFlipBook;