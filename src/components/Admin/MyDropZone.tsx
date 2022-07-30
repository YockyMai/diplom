import {
	Group,
	Text,
	useMantineTheme,
	MantineTheme,
	Loader,
} from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { $authHost } from '../../http';
import { showNotification } from '@mantine/notifications';
import { ImageServer } from '../UI/ImageServer';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
	return status.accepted
		? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
		: status.rejected
		? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
		: theme.colorScheme === 'dark'
		? theme.colors.dark[0]
		: theme.colors.gray[7];
}

function ImageUploadIcon({
	status,
	...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
	if (status.accepted) {
		return <Upload {...props} />;
	}

	if (status.rejected) {
		return <X {...props} />;
	}

	return <Photo {...props} />;
}

export const dropzoneChildren = (
	status: DropzoneStatus,
	theme: MantineTheme,
	fileSrc: string,
	fileLoading: boolean,
) => (
	<Group
		position="center"
		spacing="xl"
		style={{ minHeight: 220, pointerEvents: 'none' }}>
		{fileSrc.length > 0 ? (
			<ImageServer src={fileSrc} />
		) : (
			<>
				{fileLoading ? (
					<Loader />
				) : (
					<ImageUploadIcon
						status={status}
						style={{ color: getIconColor(status, theme) }}
						size={80}
					/>
				)}

				<div>
					<Text size="xl">
						Перетащите изображение или нажмите для загрузки файла
					</Text>
				</div>
			</>
		)}
	</Group>
);

interface MyDropZone {
	fileSrc: string;
	setFileSrc: Dispatch<SetStateAction<string>>;
}

export const MyDropZone: FC<MyDropZone> = ({ fileSrc, setFileSrc }) => {
	const theme = useMantineTheme();

	const [fileLoading, setFileLoading] = useState(false);

	const uploadFile = async (file: File) => {
		try {
			setFileLoading(true);
			let formData = new FormData();
			formData.append('img', file);

			const response = await $authHost.post(
				'api/product/uploadimage',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);

			if (response.status !== 200) {
				throw new Error('Server Error');
			}

			setFileSrc(response.data);
		} catch (error) {
			showNotification({
				color: 'red',
				message: 'Не удалось загрузить файл, попробуйте позже',
				title: 'Ошибка!',
			});
			setFileLoading(false);
		}
	};

	return (
		<Dropzone
			loading={fileLoading}
			multiple={false}
			onDrop={files => {
				uploadFile(files[0]).finally(() => {
					setFileLoading(false);
				});
			}}
			onReject={files => console.log('rejected files', files)}
			accept={IMAGE_MIME_TYPE}>
			{status => dropzoneChildren(status, theme, fileSrc, fileLoading)}
		</Dropzone>
	);
};
