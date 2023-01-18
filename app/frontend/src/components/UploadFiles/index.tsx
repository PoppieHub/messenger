import React from 'react';
import { Modal, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import {UploadFilesProps} from "../../models/props/UploadFilesProps";
import './UploadFiles.scss';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadFiles: React.FC<UploadFilesProps> = ({uploaded, callbackOnDeleteContent}) => {
    const [previewOpen, setPreviewOpen] = React.useState<boolean>(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [fileList, setFileList] = React.useState<UploadFile[]>([{} as UploadFile]);

    React.useEffect(() => {
        let tempFileList = [{} as UploadFile];
        setFileList(tempFileList);

        if (uploaded.items?.length > 0) {
            uploaded.items.forEach((item, index) => {
                if (item.id) {
                    tempFileList[index] = {
                        uid: item.id.toString(),
                        status: "done",
                        url: process.env.REACT_APP_BACKEND_URL + '/' + item.link,
                        name: (process.env.REACT_APP_BACKEND_URL + '/' + item.link).split('/')[7]
                    };
                }
            });
            setFileList(tempFileList);
        }
    }, [uploaded]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    /*const handleChange: UploadProps['onChange'] = ({ fileList: newFileList}) => {
        setFileList(newFileList);
    }*/

    return (
        <>
            {fileList && (
                <>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onRemove={(data: UploadFile) => callbackOnDeleteContent(data.uid)}
                    >
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </>
            )
            }
        </>
    );
};

export default UploadFiles;