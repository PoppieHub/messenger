import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Carousel.scss';
const Carousel = ({children, width, customBackground}: {
    children: any;
    width: number;
    customBackground?: string;
}) => {
    const [items, setItems] = React.useState<React.ReactNode[]>([]);
    const [offset, setOffset] = React.useState<number>(0);
    const [maxOffset, setMaxOffset] = React.useState<number>(0);

    const handleSetMaxOffset = React.useCallback((): void => {
        setMaxOffset(
            -(width * (items.length - 1))
        );
    }, [width, items.length]);

    const handleLeftArrowClick = () => {
        setOffset((currentOffset) => {
            return Math.min(currentOffset + width, 0);
        });
    }

    const handleRightArrowClick = () => {
        handleSetMaxOffset();
        setOffset((currentOffset) => {
            return Math.max(currentOffset - width, maxOffset);
        });
    }

    React.useEffect(() => {
        setOffset(0);
        setItems(
            React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                    style: {
                        height: '100%',
                        minWidth: `${width}px`,
                        maxWidth: `${width}px`,
                        background: (index === 0)? customBackground:''
                    }
                });
            })
        );
        handleSetMaxOffset();
    }, [children, customBackground, handleSetMaxOffset, width]);

    return (
        <div className="carousel-mainContainer">
            {(offset !== 0 &&
                <FaChevronLeft className="arrow" onClick={handleLeftArrowClick}/>) ||
                <div className='arrow--disable'/>
            }
            <div className="carousel-mainContainer-window">
                <div className="all-items-container"
                    style={{
                        transform: `translateX(${offset}px)`
                    }}
                >
                    {items}
                </div>
            </div>
            {(offset !== -(width * (items.length - 1)) &&
                <FaChevronRight className="arrow" onClick={handleRightArrowClick}/>) ||
                <div className='arrow--disable'/>
            }
        </div>
    );
}

export default Carousel;