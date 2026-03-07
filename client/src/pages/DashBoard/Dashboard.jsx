import React from 'react';
import Toast from '../../toast/Toast';
import { AnimatePresence } from 'motion/react';
import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toast: null,
        };
    }

    showToast = (message, hasButton = false, CB = null) => {
        this.setState({ toast: { message, hasButton, CB } });
    }

    hideToast = () => {
        this.setState({ toast: null });
    }

    render() {
        const { toast } = this.state;

        return (
            <div>
                <h1>dashboard</h1>
                <button onClick={() => this.showToast('Action completed.', false, () => this.hideToast())}>
                    TEST
                </button>

                <AnimatePresence>
                    {toast && (
                        <Toast
                            success
                            message={toast.message}
                            hasButton={toast.hasButton}
                            CB={toast.CB}
                            onClose={this.hideToast}
                        />
                    )}
                </AnimatePresence>
            </div>
        );
    }
}

export default Dashboard;