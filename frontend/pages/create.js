import CreateMeasurement from '../components/CreateMeasurement';
import PleaseSignIn from '../components/PleaseSignIn';

export default function CreateMeasurementPage() {
    return (
        <div>
            <PleaseSignIn>
                <CreateMeasurement />
            </PleaseSignIn>
        </div>
    )
}