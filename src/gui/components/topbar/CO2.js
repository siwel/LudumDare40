import React from 'react';
import co2btn from '../../../../assets/gui/icn_co2-x2.png'
import meterMark from '../../../../assets/gui/meter_mark-x2.png'
import co2Bar from '../../../../assets/image/co2.png'
import styles from '../../styles/gui.css';

export class CO2 extends React.Component {
	render () {
		const co2 = this.props.value;

		const width = (210/100) * co2;
		return <div className={styles.co2}>
			<img className={styles.co2Icon} src={co2btn} />

			<div className={styles.co2Bar} >
				<div  className={styles.co2BarImageContainer} style={{width: width}}>
					<img className={styles.co2BarImage} src={co2Bar} />
				</div>
				<img className={styles.co2BarMarker} src={meterMark} />
			</div>
		</div>;
	}
}
