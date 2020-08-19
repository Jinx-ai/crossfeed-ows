import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthForm } from 'components';
import { Button, Checkbox } from '@trussworks/react-uswds';
import { useAuthContext, AuthUser } from 'context';
import { User } from 'types';

interface FormData {
  firstName: string;
  lastName: string;
  organization?: string;
}

interface Errors extends Partial<FormData> {
  global?: string;
}

export const currentTermsVersion = '1';

export const getMaximumRole = (user: AuthUser | null | undefined) => {
  if (user?.userType === 'globalView') return 'globalView';
  return user && user.roles && user.roles.find(role => role.role === 'admin')
    ? 'admin'
    : 'user';
};

export const getToUVersion = (user?: AuthUser | null | undefined) => {
  return `v${currentTermsVersion}-${getMaximumRole(user)}`;
};

export const TermsOfUse: React.FC = () => {
  const history = useHistory();
  const [accepted, setAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const { user, login, apiPost } = useAuthContext();

  const onSubmit: React.FormEventHandler = async e => {
    e.preventDefault();
    try {
      if (!accepted) throw Error('Must accept terms');
      const updated: User = await apiPost(`/users/me/acceptTerms`, {
        body: { version: getToUVersion(user) }
      });

      login(localStorage.getItem('token')!, updated);
      history.push('/', {
        message: 'Your account has been successfully created.'
      });
    } catch (e) {
      setErrors({
        global: e.message ?? e.toString()
      });
    }
  };

  return (
    <AuthForm onSubmit={onSubmit}>
      <h1>Terms of Use</h1>
      <p>You must read and sign the Terms of Use before using Crossfeed.</p>
      <p>
        Crossfeed is a free, self-service tool offered by the Department of
        Homeland Security’s Cybersecurity and Infrastructure Security Agency
        (CISA). Using both passive and active processes, Crossfeed can
        continuously evaluate the cybersecurity posture of your public-facing,
        internet-accessible network assets for vulnerabilities or configuration
        issues. Once you create a Crossfeed account, input the Internet Protocol
        (IP) addresses or domains to be continuously evaluated, and select the
        scanning/evaluation protocols to be used, Crossfeed will collect data
        about the sites you specified from multiple publicly-available
        resources, including through active interactions with your sites, if
        that option is selected by you. Crossfeed will also examine any
        publicly-available, internet-accessible resources that appear to be
        related or otherwise associated with IPs or domains you have provided us
        to evaluate, presenting you with a list of those related sites for your
        awareness.
      </p>
      <p>
        By creating a Crossfeed login and using this service, you request CISA’s
        technical assistance to detect vulnerabilities and configuration issues
        through Crossfeed and agree to the following:
      </p>
      <ul>
        <li>
          You have authority to authorize scanning/evaluation of the
          public-facing networks and systems you submit within Crossfeed and you
          authorize CISA to conduct any such scans/evaluation through Crossfeed;
        </li>
        <li>
          You agree to promptly update or change the information used to
          identify the public-facing networks and systems to be
          scanned/evaluated pursuant to this authorization;
        </li>
        <li>
          You agree to comply with any notification or authorization requirement
          that any third party that operates or maintains your public-facing
          networks or systems may impose on external vulnerability scanning
          services, modifying any Crossfeed scans associated with your account
          if external scanning of those resources is later prohibited;
        </li>
        <li>
          You accept that, while Crossfeed will use best efforts to conduct
          scans in a way that minimizes risk to your organization’s systems and
          networks, Crossfeed scanning activities creates some risk of
          degradation in performance to your organization’s systems and
          networks;
        </li>
        <li>
          You acknowledge that use of Crossfeed is governed exclusively by
          federal law and that CISA provides no warranties of any kind relating
          to any aspect of your use of Crossfeed, including that Crossfeed may
          detect only a limited range of vulnerabilities or configuration issues
          and that there is no guarantee that Crossfeed will detect any or all
          vulnerabilities or configuration issues present in your system;
        </li>
        <li>
          You accept that CISA may modify or discontinue the Crossfeed service
          at any time;
        </li>
        <li>
          You agree to not:
          <ul>
            <li>
              Use the Crossfeed service in violation of any applicable law;
            </li>
            <li>
              Access or attempt to access any other user’s Crossfeed account or
              the data contained in such account; and
            </li>
            <li>
              Introduce malware to the Crossfeed platform or otherwise impair,
              harm, or disrupt the functioning or integrity of the platform in
              any way;
            </li>
          </ul>
        </li>
        <li>
          You accept that, at CISA’s sole discretion, CISA may terminate or
          suspend your access to the Crossfeed service due to violation of these
          terms or any other reason; and
        </li>
        <li>
          You are authorized to make the above certifications on your
          organization’s behalf.
        </li>
      </ul>
      <p>ToU version {getToUVersion(user)}</p>
      <Checkbox
        required
        id="accept"
        name="accept"
        label="I accept the above Terms and Conditions."
        checked={accepted}
        onChange={e => setAccepted(e.target.checked)}
      />
      <p style={{ marginBottom: 0 }}>
        <strong>Name:</strong> {user?.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <div className="width-full display-flex flex-justify-start">
        {errors.global && <p className="text-error">{errors.global}</p>}
      </div>
      <Button type="submit">Submit</Button>
    </AuthForm>
  );
};