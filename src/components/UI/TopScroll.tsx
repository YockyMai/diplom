import React from 'react';
import { Affix, Transition, Button, ActionIcon } from '@mantine/core';
import { ArrowUp } from 'tabler-icons-react';
import { useWindowScroll } from '@mantine/hooks';

export const TopScroll = () => {
	const [scroll, scrollTo] = useWindowScroll();
	return (
		<Affix position={{ bottom: 20, right: 20 }}>
			<Transition transition="fade" mounted={scroll.y > 0}>
				{transitionStyles => (
					<ActionIcon
						size="lg"
						style={transitionStyles}
						color="blue"
						variant="filled"
						onClick={() => scrollTo({ y: 0 })}>
						<ArrowUp />
					</ActionIcon>
				)}
			</Transition>
		</Affix>
	);
};
