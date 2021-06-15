import { normalizeSlackNotification } from '../';

let mockErrors = [{ error: 'mock error' }];
let mockWarnings = [{ error: 'mock warning' }];

describe('Slack notification helper', () => {
  describe('When a error is sent to be normalized', () => {
    test('normalized output is correctly formatted', () => {
      const notification = normalizeSlackNotification(mockErrors, [], 1);
      const { attachments, blocks } = notification;
      expect(notification).toEqual({
        text: 'An extract cycle finished',
        attachments: [
          {
            text: expect.any(String),
          },
        ],
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: expect.any(String),
            },
          },
        ],
      });

      expect(attachments[0].text).toContain('ERROR');
      expect(blocks[0].text.text).toEqual(expect.stringMatching('Cycle finiched at at iterable'));
    });
  });

  describe('When a warning is sent to be normalized', () => {
    test('normalized output is correctly formatted', () => {
      const notification = normalizeSlackNotification([], mockWarnings, 1);
      const { attachments, blocks } = notification;
      expect(notification).toEqual({
        text: 'An extract cycle finished',
        attachments: [
          {
            text: expect.any(String),
          },
        ],
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: expect.any(String),
            },
          },
        ],
      });

      expect(attachments[0].text).toContain('WARNING');
      expect(blocks[0].text.text).toEqual(expect.stringMatching('Cycle completed with 1 warning'));
    });
  });

  describe('When a warning and error is sent to be normalized', () => {
    test('normalized output is correctly formatted and show both the error and warnings', () => {
      const notification = normalizeSlackNotification(mockErrors, mockWarnings, 1);
      const { attachments, blocks } = notification;

      expect(notification).toEqual({
        text: 'An extract cycle finished',
        attachments: [
          {
            text: expect.any(String),
          },
          {
            text: expect.any(String),
          },
        ],
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: expect.any(String),
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: expect.any(String),
            },
          },
        ],
      });

      expect(attachments[0].text).toContain('ERROR');
      expect(attachments[1].text).toContain('WARNING');
      expect(blocks[0].text.text).toEqual(expect.stringMatching('Cycle finiched at at iterable'));
      expect(blocks[1].text.text).toEqual(expect.stringMatching('Cycle completed with 1 warning'));
    });
  });

  describe('Given a clean cycle', () => {
    test('normalized output is correctly formatted', () => {
      const notification = normalizeSlackNotification([], [], 1);
      const { blocks } = notification;
      expect(notification).toEqual({
        text: 'An extract cycle finished',
        attachments: [],
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: expect.any(String),
            },
          },
        ],
      });

      expect(blocks[0].text.text).toEqual(expect.stringMatching('Cycle completed successfully'));
    });
  });
});
