import React, { useMemo } from 'react';

import { easeInOut } from '@atlaskit/motion/curves';
import { mediumDurationMs } from '@atlaskit/motion/durations';
import { Box, Inline, Stack, xcss } from '@atlaskit/primitives';
import { useThemeObserver } from '@atlaskit/tokens';

import { Column } from './pieces/iframe-board/column';
import pdndLogoSrc from './pieces/pdnd-logo.svg';

const containerStyles = xcss({ height: '100%', paddingBottom: 'space.200' });
const iframeStyles = xcss({ border: 'none', width: '250px' });

const logoStyles = xcss({
	transition: `all ${mediumDurationMs}ms ${easeInOut}`,
	display: 'inline-block',
	filter: 'grayscale(1)',
	padding: 'space.100', // making the hitbox for the link nice and generous
	':hover': {
		transform: 'scale(1.3)',
		filter: 'grayscale(0)',
	},
});

// Including link to pdnd so that folks who are linked
// to this example directly can easily find their way to the project
function LinkToProject() {
	return (
		<Box
			as="a"
			href="https://github.com/atlassian/pragmatic-drag-and-drop"
			aria-label="Pragmatic drag and drop Github project"
			xcss={logoStyles}
			draggable="false"
			target="_blank"
		>
			<img src={pdndLogoSrc} width="50px" alt="" draggable="false" />
		</Box>
	);
}

export default function IFrameBoard() {
	const theme = useThemeObserver();
	const iframeSrc = useMemo(() => {
		const url = new URL('/examples.html', window.location.origin);
		url.searchParams.set('groupId', 'pragmatic-drag-and-drop');
		url.searchParams.set('packageId', 'docs');
		url.searchParams.set('exampleId', 'iframe-column');
		if (theme.colorMode) {
			url.searchParams.set('mode', theme.colorMode);
		}

		return url.href;
	}, [theme.colorMode]);

	return (
		<Stack alignInline="center" spread="space-between" xcss={containerStyles}>
			<Box padding="space.500">
				<Inline space="space.200" alignInline="center" shouldWrap>
					<Column columnId={'first'} />
					<Box as="iframe" src={iframeSrc} xcss={iframeStyles} />
				</Inline>
			</Box>
			<LinkToProject />
		</Stack>
	);
}
